using System.Text.RegularExpressions;

namespace Ede.Uofx.Customize.Web.Core.Middlewares
{
    /// <summary>
    /// 開發環境專用：反向代理到 Angular 開發服務器（類似 Nginx）
    /// </summary>
    /// <remarks>
    /// 目的：除了 API 路由外，所有請求都轉發到 Angular 開發服務器 (port 40001)
    /// 
    /// 優點：
    /// 1. 邏輯簡單，類似 Nginx 的 proxy_pass 行為
    /// 2. 不需要區分檔案類型或路徑，統一處理
    /// 3. 支援 Angular 熱重載，任何檔案變更都能即時反映
    /// 4. 所有前端資源（plugin.json、remoteEntry.js、assets）都由 Angular 統一提供
    ///
    /// 【情境範例】
    /// 外部系統（UOFX）透過 PluginService 呼叫：
    /// 1. http://xx.xx.xx.xx:port/plugin.versions.json
    ///    -> 代理到 http://localhost:40001/plugin.versions.json
    /// 2. http://xx.xx.xx.xx:port/1_0/assets/configs/fields-design.json
    ///    -> 移除版本號後代理到 http://localhost:40001/assets/configs/fields-design.json
    /// 3. http://xx.xx.xx.xx:port/1_0/remoteEntry.js
    ///    -> 移除版本號後代理到 http://localhost:40001/remoteEntry.js
    /// 4. http://xx.xx.xx.xx:port/1_0/api/employee
    ///    -> 移除版本號後代理到 http://localhost:40001/api/employee
    /// </remarks>
    public class DevProxyMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly string _angularDevServerUrl;
        private readonly ILogger<DevProxyMiddleware> _logger;

        public DevProxyMiddleware(RequestDelegate next, IConfiguration configuration, ILogger<DevProxyMiddleware> logger)
        {
            _next = next;
            _logger = logger;
            _angularDevServerUrl = Environment.GetEnvironmentVariable("ANGULAR_SPA_PROXY_URL")
                ?? "http://localhost:40001";
        }

        public async Task InvokeAsync(HttpContext context)
        {
            _logger.LogDebug($"[Dev Proxy] Incoming request: {context.Request.Path}");
            var path = context.Request.Path.Value;
            if (path == null)
            {
                await _next(context);
                return;
            }

            // ----------------------------------------
            // 步驟一：規範化路徑，移除重複的斜線
            // ----------------------------------------
            // 問題：外部系統可能產生 //plugin.versions.json 或 /1_0//assets/configs 這樣的路徑
            // 解決：將連續的多個斜線合併為單一斜線
            // 轉換範例：
            // - //plugin.versions.json -> /plugin.versions.json
            // - /1_0//assets/configs/fields-design.json -> /1_0/assets/configs/fields-design.json
            // - ///api/employee -> /api/employee
            if (path.Contains("//"))
            {
                path = Regex.Replace(path, @"/+", "/");
                context.Request.Path = path;
                _logger.LogDebug($"[Dev Proxy] Normalized path: {path}");
            }

            // ----------------------------------------
            // 步驟二：移除版本號前綴（排除 API）
            // ----------------------------------------
            // 轉換範例：
            // - /1_0/assets/configs/fields-design.json -> /assets/configs/fields-design.json
            // - /1_0/remoteEntry.js -> /remoteEntry.js
            // - /1_0/api/employee -> /api/employee
            // - /undefined/assets/icons/settings.png -> /assets/icons/settings.png (處理版本號獲取失敗的情況)
            //
            // 原因：外部系統根據 plugin.versions.json 中的 version: "1.0"，組合成 /1_0/ 路徑
            //       但開發環境 Angular 服務器的檔案結構無版本號目錄，需移除此前綴
            var versionMatch = Regex.Match(path, @"^/(\d+_\d+|undefined)(/.+)$");
            if (versionMatch.Success)
            {
                var targetPath = versionMatch.Groups[2].Value;
                context.Request.Path = targetPath;
                path = targetPath;
                _logger.LogDebug($"[Dev Proxy] Removed version prefix, new path: {path}");
            }

            // ----------------------------------------
            // 步驟二-1：相容 _framework 前綴路徑
            // ----------------------------------------
            // 部分宿主系統或快取情境會以 /_framework/* 取用 webpack chunk。
            // Angular 開發伺服器實際路徑通常在根目錄，因此在開發代理中移除此路徑前綴。
            if (path.StartsWith("/_framework/", StringComparison.OrdinalIgnoreCase))
            {
                path = path["/_framework".Length..];
                context.Request.Path = path;
                _logger.LogDebug($"[Dev Proxy] Removed _framework prefix, new path: {path}");
            }

            // ----------------------------------------
            // 步驟三：代理所有非 API 請求到 Angular 開發服務器
            // ----------------------------------------
            // 等同於 Nginx 的 proxy_pass http://localhost:40001;
            //
            // 處理的內容：
            // - Plugin 設定檔：plugin.manifest.json, plugin.versions.json
            // - Module Federation：remoteEntry.js
            // - 前端資源：main.js, polyfills.js, styles.css, *.map
            // - 靜態資源：assets/configs/*.json, assets/icons/*.svg
            // - 其他任何 Angular 開發服務器提供的內容
            //
            // 【為什麼使用 HttpClient 代理？】
            // 1. 跨進程通訊：Angular 是獨立的 Node.js 進程（port 40001），.NET 是另一個進程（port 8899）
            // 2. 記憶體中的檔案：remoteEntry.js 等由 Webpack 動態產生在記憶體中，無法用 File.ReadAllBytes() 讀取
            // 3. 熱重載支援：Angular 開發服務器監聽檔案變更並即時編譯，透過 HTTP 代理才能取得最新內容
            // 4. 標準做法：前後端分離開發的常見模式，類似 Nginx 反向代理
            if (!path.StartsWith("/api/", StringComparison.OrdinalIgnoreCase))
            {
                try
                {
                    using var httpClient = new HttpClient();
                    var targetUrl = $"{_angularDevServerUrl}{path}{context.Request.QueryString}";
                    var response = await httpClient.GetAsync(targetUrl);
                    if (response.IsSuccessStatusCode)
                    {
                        // 將 Angular 開發服務器的完整回應轉發給客戶端
                        context.Response.StatusCode = (int)response.StatusCode;
                        context.Response.ContentType = response.Content.Headers.ContentType?.ToString();
                        // 開發環境避免瀏覽器快取舊版 remoteEntry/chunk 造成 ChunkLoadError。
                        context.Response.Headers.CacheControl = "no-store, no-cache, must-revalidate, max-age=0";
                        context.Response.Headers.Pragma = "no-cache";
                        context.Response.Headers.Expires = "0";
                        await context.Response.Body.WriteAsync(await response.Content.ReadAsByteArrayAsync());
                        return; // 代理成功，直接回傳
                    }
                }
                catch
                {
                    // 代理失敗則繼續往下，讓其他中間件處理（如 404）
                }
            }

            // API 請求或代理失敗的請求，繼續執行後續中間件
            await _next(context);
        }
    }

    /// <summary>
    /// DevProxyMiddleware 的擴展方法
    /// </summary>
    public static class DevProxyMiddlewareExtensions
    {
        /// <summary>
        /// 使用開發環境反向代理中間件
        /// </summary>
        /// <param name="builder">應用程式建構器</param>
        /// <returns></returns>
        public static IApplicationBuilder UseDevProxy(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<DevProxyMiddleware>();
        }
    }
}
