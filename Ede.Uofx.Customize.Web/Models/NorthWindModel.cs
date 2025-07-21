namespace Ede.Uofx.Customize.Web.Models
{
    public class CustomerModel
    {
        public string CustomerID { get; set; }
        public string CompanyName { get; set; }
        public string? ContactName { get; set; }
        public string? Phone { get; set; }
    }

    public class CategoryModel
    {
        public decimal CategoryID { get; set; }
        public string CategoryName { get; set; }
    }

    public class ProductModel
    {
        public decimal ProductID { get; set; }
        public string? ProductName { get; set; }
        public decimal Quantity { get; set; }
        public decimal? UnitPrice { get; set; }
        public decimal? UnitsInStock { get; set; }
    }

    public class OrderModel
    {
        public decimal? OrderID { get; set; }
        public DateTimeOffset OrderDate { get; set; }
        public List<OrderDetailModel> OrderDetails { get; set; }
    }

    public class OrderDetailModel
    {
        public decimal? OrderID { get; set; }
        public decimal ProductID { get; set; }
        public decimal Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }
}
