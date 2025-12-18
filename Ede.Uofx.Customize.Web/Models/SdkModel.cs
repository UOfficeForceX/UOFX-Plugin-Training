namespace Ede.Uofx.Customize.Web.Models
{
    public class ApplyFormRequestModel
    {
        /// <summary>
        /// 帳號
        /// </summary>
        public string Account {  get; set; }
        /// <summary>
        /// 申請者部門代號
        /// </summary>
        public string DeptCode { get; set; }
        /// <summary>
        /// 客製資訊(也可組成json傳入)
        /// </summary>
        public string? CustomData { get; set; }
        /// <summary>
        /// 有附件時請填入完整的檔案路徑ex: D:\sample\sample.pdf
        /// </summary>
        public string?FilePath { get; set; }
    }
 

    /// <summary>
    ///  外部起單當 成功 時，UofxData 會存放表單資訊，表單資訊 Model 
    /// </summary>
    public class ApplyFormResponseModel
    {
        /// <summary>
        /// 表單名稱
        /// </summary>
        public string FormName { get; set; }
        /// <summary>
        /// 表單編號
        /// </summary>
        public string FormSn { get; set; }
    }

    /// <summary>
    ///  SDK Callback
    /// </summary>
    public class SdkCallbackModel
    {
        /// <summary>
        /// SDK 類型
        /// </summary>
        public string Type { get; set; }
        /// <summary>
        /// callback  資料
        /// </summary>
        public string Data { get; set; }
    }
}
