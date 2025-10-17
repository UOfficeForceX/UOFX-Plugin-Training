using Ede.Uofx.Customize.Web.Extensions;
using Ede.Uofx.Customize.Web.Service;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);
var cors = builder.Configuration.GetSection("AllowCors").Get<List<string>>();
builder.Configuration.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true).AddEnvironmentVariables();

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins(cors?.ToArray())
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                      });
});

// Register NorthWindService¡BSdkService
builder.Services.AddSingleton<NorthWindService>();
builder.Services.AddSingleton<SdkService>();
builder.Services.AddSingleton<ValidationService>();

builder.Services.AddControllersWithViews();
builder.Services.AddControllers();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors(MyAllowSpecificOrigins);

// app.UseMiddleware<ApiSignatureMiddleware>();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
