namespace Ede.Uofx.Customize.Web.Extensions
{
    public class ApiSignatureMiddleware
    {
        private readonly RequestDelegate _next;
        const string apikey = "SampleAdvanced";

        public ApiSignatureMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            var clientId = context.Request.Headers["X-ClientId"].FirstOrDefault();
            var times = context.Request.Headers["X-Timestamp"].FirstOrDefault();
            var signature = context.Request.Headers["X-Signature"].FirstOrDefault();
            var nonce = context.Request.Headers["X-Nonce"].FirstOrDefault();

            //首先將它們依照指定格式組成字串後，
            //接下來拿 API Key 作為 Key 使用 HMAC - SHA512 計算出 Signature

            var message = $"{clientId}{times}{nonce}";
            var compareSignature = message.ToString().HMACSHA512(apikey);

            if (signature != compareSignature)
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Signature verify fail.");
                return;
            }

            // 檢查 timestamp 和 server 相差不超過五分鐘
            if (long.TryParse(times, out long parsedTimes))
            {
                long currentTimeMillis = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
                long timeDifferenceMillis = currentTimeMillis - parsedTimes;

                TimeSpan timeDifference = TimeSpan.FromMilliseconds(timeDifferenceMillis);

                if (timeDifference.TotalMinutes > 5)
                {
                    context.Response.StatusCode = 401;
                    await context.Response.WriteAsync("timestamp expired");
                    return;
                }
            }
            await _next.Invoke(context);
        }
    }
}