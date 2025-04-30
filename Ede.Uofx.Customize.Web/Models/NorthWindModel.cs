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
        public int CategoryID { get; set; }
        public string CategoryName { get; set; }
    }

    public class ProductModel
    {
        public int ProductID { get; set; }
        public string? ProductName { get; set; }
        public int Quantity { get; set; }
        public decimal? UnitPrice { get; set; }
        public int? UnitsInStock { get; set; }
    }

    public class OrderModel
    {
        public int? OrderID { get; set; }
        public DateTimeOffset OrderDate { get; set; }
        public List<OrderDetailModel> OrderDetails { get; set; }
    }

    public class OrderDetailModel
    {
        public int? OrderID { get; set; }
        public int ProductID { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }
}
