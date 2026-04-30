namespace Ede.Uofx.Customize.Web.Models
{
    /// <summary>
    /// 庫存檢查模型
    /// </summary>
    public class StockCheckModel
    {
        public ExternalModel Type { get; set; }
        public decimal Quantity { get; set; }
        public decimal Stock { get; set; }
    }
}
