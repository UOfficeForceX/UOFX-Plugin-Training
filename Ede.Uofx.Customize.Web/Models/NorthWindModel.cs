namespace Ede.Uofx.Customize.Web.Models
{
    /// <summary>
    /// 客戶資料模型
    /// </summary>
    public class CustomerModel
    {
        public string CustomerID { get; set; }
        public string CompanyName { get; set; }
        public string? ContactName { get; set; }
        public string? Phone { get; set; }
    }
    /// <summary>
    /// 類別資料模型
    /// </summary>
    public class CategoryModel
    {
        public decimal CategoryID { get; set; }
        public string CategoryName { get; set; }
    }
    /// <summary>
    /// 依類別取得產品列表模型
    /// </summary>
    public class SearchProductsByCategoryModel
    {
        public ExternalModel? CategoryItem { get; set; }
    }
    /// <summary>
    /// 搜尋產品資料模型
    /// </summary>
    public class SearchProductsByPageModel
    {
        public PageInfoModel? PageInfo { get; set; }
    }
    /// <summary>
    /// 取得產品數量模型
    /// </summary>
    public class GetProductsCountModel
    {
        public ExternalModel? CategoryItem { get; set; }
    }
    /// <summary>
    /// 依產品ID取得產品資料模型
    /// </summary>
    public class GetProductModel
    {
        public ExternalModel? ProductItem { get; set; }
    }
    /// <summary>
    /// 產品資料模型
    /// </summary>
    public class ProductModel
    {
        public decimal ProductID { get; set; }
        public string? ProductName { get; set; }
        public decimal Quantity { get; set; }
        public decimal? UnitPrice { get; set; }
        public decimal? UnitsInStock { get; set; }
    }
    /// <summary>
    /// 更新產品資料模型
    /// </summary>
    public class UpdateProductModel
    {
        public ExternalModel Type { get; set; }
        public ExternalModel ProductItem { get; set; }
        public decimal Quantity { get; set; }
    }
    /// <summary>
    /// 訂單資料模型
    /// </summary>
    public class OrderModel
    {
        public decimal? OrderID { get; set; }
        public DateTimeOffset OrderDate { get; set; }
        public List<OrderDetailModel> OrderDetails { get; set; }
    }
    /// <summary>
    /// 訂單明細資料模型
    /// </summary>
    public class OrderDetailModel
    {
        public decimal? OrderID { get; set; }
        public decimal ProductID { get; set; }
        public decimal Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }
    /// <summary>
    /// 下拉/單選/複選欄位資料模型
    /// </summary>
    public class ExternalModel
    {
        public string Selected { get; set; }
        public string FillText { get; set; }
        public bool IsOther { get; set; }
    }
    /// <summary>
    /// 分頁資訊模型
    /// </summary>
    public class PageInfoModel
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}
