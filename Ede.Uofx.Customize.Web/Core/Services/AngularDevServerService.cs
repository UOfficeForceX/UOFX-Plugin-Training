using System.Diagnostics;
using System.Net.Sockets;
using System.Text;

namespace Ede.Uofx.Customize.Web.Core.Services
{
    /// <summary>
    /// 管理 Angular 開發伺服器的生命週期
    /// </summary>
    /// <remarks>
    /// 功能：
    /// 1. 啟動時：執行 ng serve --disable-host-check --port {Port}
    /// 2. 終止時：使用 taskkill /T /F 終止進程樹
    ///
    /// 優點：
    /// - 統一從 appsettings 讀取 port 配置
    /// - .NET 終止時自動清理 Angular 進程
    /// - 不需要修改 package.json
    /// </remarks>
    public class AngularDevServerService : IHostedService, IDisposable
    {
        private readonly ILogger<AngularDevServerService> _logger;
        private readonly IConfiguration _configuration;
        private readonly IHostEnvironment _environment;
        private Process? _ngProcess;
        private readonly int _port;
        private string? _clientAppPath;

        // webpack-exposes.config.js 監控相關
        private FileSystemWatcher? _configWatcher;
        private Timer? _debounceTimer;
        private readonly SemaphoreSlim _restartLock = new(1, 1);
        private CancellationTokenSource? _restartCts;
        private bool _disposed;

        public AngularDevServerService(
            ILogger<AngularDevServerService> logger,
            IConfiguration configuration,
            IHostEnvironment environment)
        {
            _logger = logger;
            _configuration = configuration;
            _environment = environment;
            _port = GetPortFromProxyUrl();
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            _clientAppPath = Path.Combine(_environment.ContentRootPath, "ClientApp");

            if (!Directory.Exists(_clientAppPath))
            {
                _logger.LogError("ClientApp 目錄不存在: {Path}", _clientAppPath);
                return;
            }

            await StartServerAsync(cancellationToken, openBrowser: true);

            // 設定 webpack-exposes.config.js 檔案監控
            SetupConfigWatcher();
        }

        /// <summary>
        /// 啟動 Angular 開發伺服器（可重複呼叫以重啟）
        /// </summary>
        private async Task StartServerAsync(CancellationToken cancellationToken, bool openBrowser = false)
        {
            if (string.IsNullOrEmpty(_clientAppPath))
            {
                _logger.LogError("ClientApp 路徑未設定");
                return;
            }

            _logger.LogInformation("正在啟動 Angular 開發伺服器，Port: {Port}", _port);

            try
            {
                // 取得 .NET 實際監聽的 URL：優先讀取 --urls CLI 參數注入的 IConfiguration["urls"]，
                // 再 fallback 至 ASPNETCORE_URLS 環境變數，最後使用預設值。
                // 這樣 proxy.conf.js 讀取子進程的 ASPNETCORE_URLS 時，
                // 才能正確代理回 --urls 所指定的後端 URL。
                var aspnetCoreUrls =
                    _configuration["urls"] ??
                    Environment.GetEnvironmentVariable("ASPNETCORE_URLS") ??
                    "http://localhost:54039";

                var startInfo = new ProcessStartInfo
                {
                    FileName = "cmd.exe",
                    Arguments = $"/c chcp 65001 >nul && npm run ng -- serve --disable-host-check --port {_port}",
                    WorkingDirectory = _clientAppPath,
                    UseShellExecute = false,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    CreateNoWindow = true,
                    StandardOutputEncoding = Encoding.UTF8,
                    StandardErrorEncoding = Encoding.UTF8
                };

                // 將後端 URL 注入子進程環境，讓 Angular proxy.conf.js 的 env.ASPNETCORE_URLS 能正確讀取
                startInfo.Environment["ASPNETCORE_URLS"] = aspnetCoreUrls;
                _logger.LogInformation("注入 ASPNETCORE_URLS 至 Angular 子進程: {Urls}", aspnetCoreUrls);

                _ngProcess = new Process { StartInfo = startInfo };

                _ngProcess.OutputDataReceived += (sender, args) =>
                {
                    if (!string.IsNullOrEmpty(args.Data))
                    {
                        _logger.LogInformation("[Angular] {Data}", args.Data);
                    }
                };

                _ngProcess.ErrorDataReceived += (sender, args) =>
                {
                    if (!string.IsNullOrEmpty(args.Data))
                    {
                        _logger.LogWarning("[Angular] {Data}", args.Data);
                    }
                };

                _ngProcess.Start();
                _ngProcess.BeginOutputReadLine();
                _ngProcess.BeginErrorReadLine();

                _logger.LogInformation("Angular 開發伺服器進程已啟動，PID: {ProcessId}", _ngProcess.Id);

                // 等待 Angular 伺服器就緒
                var isReady = await WaitForServerReadyAsync(cancellationToken);

                // Angular 就緒後開啟瀏覽器（僅首次啟動時）
                if (isReady && openBrowser)
                {
                    OpenBrowser();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "啟動 Angular 開發伺服器失敗");
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("正在停止 Angular 開發伺服器...");
            KillProcessTree();
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            if (_disposed)
            {
                return;
            }
            _disposed = true;

            // 取消正在進行的重啟操作
            _restartCts?.Cancel();

            // 停止檔案監控
            if (_configWatcher != null)
            {
                _configWatcher.EnableRaisingEvents = false;
                _configWatcher.Dispose();
            }

            // 停止並等待 debounce timer
            _debounceTimer?.Dispose();

            // 等待可能正在執行的重啟操作完成
            try
            {
                _restartLock.Wait(TimeSpan.FromSeconds(5));
            }
            catch (ObjectDisposedException)
            {
                // 如果已經被釋放，忽略
            }
            finally
            {
                _restartLock.Dispose();
            }

            _restartCts?.Dispose();
            KillProcessTree();
            _ngProcess?.Dispose();
        }

        private void KillProcessTree()
        {
            if (_ngProcess == null || _ngProcess.HasExited)
            {
                return;
            }

            try
            {
                var processId = _ngProcess.Id;
                _logger.LogInformation("正在終止進程樹，PID: {ProcessId}", processId);

                // 使用 taskkill /T /F 終止進程樹（包含子進程）
                var killProcess = new Process
                {
                    StartInfo = new ProcessStartInfo
                    {
                        FileName = "taskkill",
                        Arguments = $"/T /F /PID {processId}",
                        UseShellExecute = false,
                        CreateNoWindow = true,
                        RedirectStandardOutput = true,
                        RedirectStandardError = true
                    }
                };

                killProcess.Start();
                killProcess.WaitForExit(5000);

                _logger.LogInformation("Angular 開發伺服器已終止");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "終止 Angular 開發伺服器時發生錯誤");
            }
        }

        /// <summary>
        /// 設定 webpack-exposes.config.js 檔案監控
        /// </summary>
        private void SetupConfigWatcher()
        {
            if (string.IsNullOrEmpty(_clientAppPath))
            {
                return;
            }

            const string configFile = "webpack-exposes.config.js";
            var configPath = Path.Combine(_clientAppPath, configFile);

            if (!File.Exists(configPath))
            {
                _logger.LogWarning("{File} 不存在，跳過檔案監控", configFile);
                return;
            }

            _configWatcher = new FileSystemWatcher
            {
                Path = _clientAppPath,
                Filter = configFile,
                NotifyFilter = NotifyFilters.LastWrite | NotifyFilters.Size,
                EnableRaisingEvents = true
            };

            _configWatcher.Changed += OnConfigFileChanged;
            _logger.LogInformation("已啟用 {File} 變更監控", configFile);
        }

        /// <summary>
        /// webpack-exposes.config.js 檔案變更處理（含防抖）
        /// </summary>
        private void OnConfigFileChanged(object sender, FileSystemEventArgs e)
        {
            // 使用防抖機制，避免檔案儲存時觸發多次
            _debounceTimer?.Dispose();
            _debounceTimer = new Timer(async _ =>
            {
                // 如果已經 disposed，跳過
                if (_disposed)
                {
                    return;
                }

                // 嘗試取得鎖，若無法立即取得則跳過（避免重複重啟）
                if (!await _restartLock.WaitAsync(0))
                {
                    return;
                }

                try
                {
                    // 取消之前的重啟操作
                    _restartCts?.Cancel();
                    _restartCts?.Dispose();
                    _restartCts = new CancellationTokenSource();

                    _logger.LogWarning("========================================");
                    _logger.LogWarning("webpack-exposes.config.js 已變更！");
                    _logger.LogWarning("正在重啟 Angular 開發伺服器...");
                    _logger.LogWarning("========================================");

                    KillProcessTree();
                    await Task.Delay(1000, _restartCts.Token);
                    await StartServerAsync(_restartCts.Token, openBrowser: false);
                }
                catch (OperationCanceledException)
                {
                    _logger.LogInformation("重啟操作已取消");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "重啟 Angular 開發伺服器時發生錯誤");
                }
                finally
                {
                    _restartLock.Release();
                }
            }, null, 500, Timeout.Infinite);
        }

        private async Task<bool> WaitForServerReadyAsync(CancellationToken cancellationToken)
        {
            var maxAttempts = 60; // 最多等待 60 秒
            var attempt = 0;

            _logger.LogInformation("等待 Angular 開發伺服器就緒...");

            while (attempt < maxAttempts && !cancellationToken.IsCancellationRequested)
            {
                if (IsPortOpen(_port))
                {
                    _logger.LogInformation("Angular 開發伺服器已就緒，Port: {Port}", _port);
                    return true;
                }

                attempt++;
                await Task.Delay(1000, cancellationToken);
            }

            _logger.LogWarning("等待 Angular 開發伺服器逾時，但將繼續執行");
            return false;
        }

        private static bool IsPortOpen(int port)
        {
            try
            {
                using var client = new TcpClient();
                var result = client.BeginConnect("localhost", port, null, null);
                var success = result.AsyncWaitHandle.WaitOne(TimeSpan.FromMilliseconds(500));

                if (success)
                {
                    client.EndConnect(result);
                    return true;
                }

                return false;
            }
            catch
            {
                return false;
            }
        }

        private static int GetPortFromProxyUrl()
        {
            var url = Environment.GetEnvironmentVariable("ANGULAR_SPA_PROXY_URL");
            if (!string.IsNullOrEmpty(url) && Uri.TryCreate(url, UriKind.Absolute, out var uri))
            {
                return uri.Port;
            }
            return 40001; // 預設值
        }

        private void OpenBrowser()
        {
            try
            {
                // 優先讀取 --urls CLI 參數（寫入 IConfiguration["urls"]），
                // 再 fallback 至 ASPNETCORE_URLS 環境變數
                var urls =
                    _configuration["urls"] ??
                    Environment.GetEnvironmentVariable("ASPNETCORE_URLS");

                if (string.IsNullOrEmpty(urls))
                {
                    _logger.LogInformation("未設定 urls 或 ASPNETCORE_URLS，跳過自動開啟瀏覽器");
                    return;
                }

                // 取得第一個 URL（可能有多個，用分號分隔）
                var url = urls.Split(';')[0].Trim();

                _logger.LogInformation("正在開啟瀏覽器: {Url}", url);

                // 使用系統預設瀏覽器開啟
                Process.Start(new ProcessStartInfo
                {
                    FileName = url,
                    UseShellExecute = true
                });
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "無法自動開啟瀏覽器，請手動開啟");
            }
        }

    }
}
