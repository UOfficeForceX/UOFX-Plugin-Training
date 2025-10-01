using Ede.Uofx.Customize.Web.Models;
using Ede.Uofx.Customize.Web.Service;
using Ede.Uofx.PubApi.Sdk.NetStd.Service;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text.Json;

namespace Ede.Uofx.Customize.Web.Controllers
{
    [Route("api/sdk")]
    [ApiController]
    [Produces("application/json")]
    public class SdkController : ControllerBase
    {
        private readonly SdkService _sdkService;
        private readonly IConfiguration _configuration;

        public SdkController(SdkService sdkService, IConfiguration configuration)
        {
            _sdkService = sdkService;
            _configuration = configuration;

            var uofxServiceSettings = _configuration.GetSection("UofxServiceSettings");
            var _serviceKey = uofxServiceSettings["UofxServiceKey"];
            var _serviceUrl = uofxServiceSettings["UofxServiceUrl"];

            //設定金鑰
            UofxService.Key = _serviceKey;
            //設定 UOF X 站台網址
            UofxService.UofxServerUrl = _serviceUrl;
        }

        /// <summary>
        /// 外部起單
        /// </summary>
        /// <returns></returns>
        [HttpPost("applyform")]
        public async Task<IActionResult> ApplyForm([Bind] ApplyFormRequestModel requestModel)
        {
            //建立 外部起單物件
            var doc = new Ede.Uofx.FormSchema.UofxFormSchema.UofxFormSchema()
            {
                //申請者帳號
                Account = requestModel.Account,
                //申請者部門代號
                DeptCode = requestModel.DeptCode,
                CallBackUrl = "http://xxx/api/sdk/applyformcallback/",
                CustomData = requestModel.CustomData
            };

            //上傳檔案
            if (!string.IsNullOrEmpty(requestModel.FilePath))
            {
                var fileView = await UofxService.File.FileUpload(@$"{requestModel.FilePath}");
                // 轉換成檔案物件
                var fileItem = new Ede.Uofx.FormSchema.UofxFormSchema.FileItem()
                {
                    Id = fileView.Id,
                    FileName = fileView.FileName
                };
                doc.AttachFiles = new List<Ede.Uofx.FormSchema.UofxFormSchema.FileItem>()
                {
                    fileItem
                };
            }

            //建立 表單欄位物件，填寫表單欄位資料
            doc.Fields = new Ede.Uofx.FormSchema.UofxFormSchema.UofxFormSchemaFields();
            doc.Fields.C002 = "我是單行單行單行單行單行";
            doc.Fields.C003 = "你是多行你是多行你是多行你是多行你是多行你是多行你是多行";
            doc.Fields.C006 = new { CustName = "demo公司" };

            try
            {
                //呼叫站台進行起單
                var traceId = await UofxService.BPM.ApplyForm(doc);

                Console.WriteLine($"Trace Id: {traceId}");
                return Ok($"Trace Id: {traceId}");
            }
            catch (Exception e)
            {
                var model = UofxService.Error.ConvertToModel(e);
                return BadRequest(UofxService.Json.Convert(model));
            }
        }

        /// <summary>
        ///  外部起單後的callback
        /// </summary>
        /// <param name="requestBody"></param>
        /// <returns></returns>
        [HttpPost("applyformcallback")]
        public IActionResult ApplyFormCallback([Bind] JsonElement requestBody)
        {
            try
            {
                //解密 api request model
                var callbackModel = UofxService.DecodeCallBack<ApplyFormResponseModel>(requestBody.ToString());
               var data = JsonConvert.SerializeObject(callbackModel);
                var model = new SdkCallbackModel() { Type="ApplyForm",Data = data };
                _sdkService.InsertSdkCallBack(model);

                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// 取得Callback成功資料
        /// </summary>
        /// <returns></returns>
        [HttpGet("result")]
        public IActionResult GetCallbackResult()
        {
            return Ok(_sdkService.GetSdkResult());
        }
    }
}
