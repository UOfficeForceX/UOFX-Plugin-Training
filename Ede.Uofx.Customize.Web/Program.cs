
using Ede.Uofx.Customize.Web.Core.Middlewares;
using Ede.Uofx.Customize.Web.Core.Services;
using Ede.Uofx.Customize.Web.Service;

#region 建立 WebApplication Builder

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true).AddEnvironmentVariables();
var cors = builder.Configuration.GetSection("AllowCors").Get<List<string>>()?
    .Where(origin => !string.IsNullOrWhiteSpace(origin))
    .Select(origin => origin.Trim())
    .Distinct(StringComparer.OrdinalIgnoreCase)
    .ToArray();

#endregion

#region 服務註冊 (Services Configuration)

// CORS 設定
builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins, policy =>
    {
        if (cors?.Contains("*") == true)
        {
            policy.AllowAnyOrigin();
        }
        else if (cors is { Length: > 0 })
        {
            policy.WithOrigins(cors);
        }

        policy.AllowAnyHeader().AllowAnyMethod();
    });
});

// 自定義服務 (NorthWindService、SdkService)
builder.Services.AddSingleton<NorthWindService>();
builder.Services.AddSingleton<SdkService>();
builder.Services.AddSingleton<ValidationService>();

// 開發環境服務 (AngularDevServerService)
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddHostedService<AngularDevServerService>();
}

// MVC/API 控制器
builder.Services.AddControllersWithViews();
builder.Services.AddControllers();

#endregion

#region 建置應用程式

var app = builder.Build();

#endregion

#region HTTP Middleware 設定

// 生產環境設定 (HSTS)
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

// HTTPS 重導向
app.UseHttpsRedirection();

// CORS 中間件（必須在 UseStaticFiles 之前，才能對靜態檔案生效）
app.UseCors(MyAllowSpecificOrigins);

// 靜態檔案
app.UseStaticFiles();

// 開發環境代理（將非 API 請求轉發到 Angular 開發服務器）
if (app.Environment.IsDevelopment())
{
    app.UseDevProxy();
}

// 路由設定
app.UseRouting();

// app.UseMiddleware<ApiSignatureMiddleware>();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

// Fallback 處理
app.MapFallbackToFile("index.html");

#endregion

#region 啟動應用程式

app.Run();

#endregion
