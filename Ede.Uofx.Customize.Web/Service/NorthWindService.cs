using Ede.Uofx.Customize.Web.Models;
using Microsoft.Data.SqlClient;

namespace Ede.Uofx.Customize.Web.Service
{
    public class NorthWindService
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public NorthWindService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("Default");
        }

        internal CustomerModel? GetCustomer(string customerId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                string sql = $@"
                SELECT CustomerID, CompanyName, ContactName, Phone
                FROM Customers
                WHERE CustomerID=@CustomerID
                ";

                using (var command = new SqlCommand(sql, connection))
                {
                    command.Parameters.AddWithValue("@CustomerID", customerId);
                    connection.Open();
                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new CustomerModel
                            {
                                CustomerID = reader.GetString(0),
                                CompanyName = reader.GetString(1),
                                ContactName = reader.GetString(2),
                                Phone = reader.GetString(3),
                            };
                        }
                    }
                }
            }

            return null;
        }

        internal void InsertCustomer(CustomerModel item)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                string sql = $@"
                INSERT INTO Customers
                (CustomerID,CompanyName,ContactName,Phone)
                values
                (@CustomerID,@CompanyName,@ContactName,@Phone)
                ";
                using (var command = new SqlCommand(sql, connection))
                {
                    command.Parameters.AddWithValue("@CustomerID", item.CustomerID);
                    command.Parameters.AddWithValue("@CompanyName", item.CompanyName);
                    command.Parameters.AddWithValue("@ContactName", item.ContactName);
                    command.Parameters.AddWithValue("@Phone", item.Phone);

                    connection.Open();
                    command.ExecuteNonQuery();
                }
            }
        }

        internal CustomerModel? UpdateCustomer(CustomerModel item)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                string sql = $@"
                UPDATE Customers
                SET 
                CompanyName=@CompanyName, ContactName=@ContactName, Phone=@Phone
                WHERE
                CustomerID=@CustomerID
                ";
                using (var command = new SqlCommand(sql, connection))
                {
                    command.Parameters.AddWithValue("@CustomerID", item.CustomerID);
                    command.Parameters.AddWithValue("@CompanyName", item.CompanyName);
                    command.Parameters.AddWithValue("@ContactName", item.ContactName);
                    command.Parameters.AddWithValue("@Phone", item.Phone);

                    connection.Open();
                    int rowsAffected = command.ExecuteNonQuery();
                    return rowsAffected > 0 ? item : null;
                }
            }
        }

        internal bool DeleteCustomer(string customerId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                string sql = $@"
                DELETE [Customers]
                WHERE CustomerID=@CustomerID
                ";
                using (var command = new SqlCommand(sql, connection))
                {
                    command.Parameters.AddWithValue("@CustomerID", customerId);

                    int rowsAffected = command.ExecuteNonQuery();
                    return rowsAffected > 0;
                }
            }
        }
        /// <summary>
        /// 取得所有客戶資料
        /// </summary>
        /// <returns></returns>
        internal List<CustomerModel>? GetCustomers()
        {
            var result = new List<CustomerModel>();
            using (var connection = new SqlConnection(_connectionString))
            {
                string sql = $@"
                SELECT CustomerID, CompanyName, ContactName, Phone
                FROM Customers
                ORDER BY CustomerID
                ";

                using (var command = new SqlCommand(sql, connection))
                {
                    connection.Open();
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var customer = new CustomerModel
                            {
                                CustomerID = reader.GetString(0),
                                CompanyName = reader.GetString(1),
                                ContactName = reader.GetString(2),
                                Phone = reader.GetString(3),
                            };
                            result.Add(customer);
                        }
                    }
                }
            }
            return result;
        }
        /// <summary>
        /// 取得所有類別資料
        /// </summary>
        /// <returns></returns>
        internal List<CategoryModel> GetCategories()
        {
            var result = new List<CategoryModel>();
            using (var connection = new SqlConnection(_connectionString))
            {
                string sql = $@"
                SELECT CategoryID, CategoryName
                FROM Categories
                ";
                using (var command = new SqlCommand(sql, connection))
                {
                    connection.Open();
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            result.Add(new CategoryModel
                            {
                                CategoryID = reader.GetInt32(0),
                                CategoryName = reader.GetString(1),
                            });
                        }
                    }
                }
            }
            return result;
        }
        /// <summary>
        /// 依類別取得商品列表
        /// </summary>
        internal List<ProductModel> SearchProductsByCategory(SearchProductsByCategoryModel model)
        {
            if (model?.CategoryItem?.Selected == null || !int.TryParse(model.CategoryItem.Selected, out int categoryId))
            {
                return new List<ProductModel>();
            }

            var result = new List<ProductModel>();
            using (var connection = new SqlConnection(_connectionString))
            {
                string sql = @"
                SELECT ProductID, ProductName, UnitPrice, UnitsInStock
                FROM Products
                WHERE CategoryID=@CategoryID
                ";
                using (var command = new SqlCommand(sql, connection))
                {
                    command.Parameters.AddWithValue("@CategoryID", categoryId);
                    connection.Open();
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            result.Add(new ProductModel
                            {
                                ProductID = reader.GetInt32(0),
                                ProductName = reader.GetString(1),
                                UnitPrice = reader.GetDecimal(2),
                                UnitsInStock = reader.GetInt16(3),
                            });
                        }
                    }
                }
            }
            return result;
        }
        /// <summary>
        /// 依分頁資訊取得商品列表
        /// </summary>
        internal List<ProductModel> SearchProductsByPage(SearchProductsByPageModel model)
        {
            var pageInfo = model.PageInfo;
            var result = new List<ProductModel>();
            using (var connection = new SqlConnection(_connectionString))
            {
                string sql = @"
                SELECT ProductID, ProductName, UnitPrice, UnitsInStock
                FROM Products
                ORDER BY ProductID
                OFFSET @Offset ROWS
                FETCH NEXT @Limit ROWS ONLY
                ";
                using (var command = new SqlCommand(sql, connection))
                {
                    command.Parameters.AddWithValue("@Offset", pageInfo != null ? (pageInfo.PageNumber - 1) * pageInfo.PageSize : 0);
                    command.Parameters.AddWithValue("@Limit", pageInfo?.PageSize ?? 15);
                    connection.Open();
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            result.Add(new ProductModel
                            {
                                ProductID = reader.GetInt32(0),
                                ProductName = reader.GetString(1),
                                UnitPrice = reader.GetDecimal(2),
                                UnitsInStock = reader.GetInt16(3),
                            });
                        }
                    }
                }
            }
            return result;
        }
        /// <summary>
        /// 依產品ID取得產品資料
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        internal ProductModel? GetProduct(GetProductModel model)
        {
            // 無選擇產品、無法轉換為整數，回傳 null
            if (model?.ProductItem?.Selected == null || !int.TryParse(model.ProductItem.Selected, out int productId))
            {
                return null;
            }

            using (var connection = new SqlConnection(_connectionString))
            {
                string sql = $@"
                SELECT ProductID, ProductName, UnitPrice, UnitsInStock
                FROM Products
                WHERE ProductID=@ProductID
                ";
                using (var command = new SqlCommand(sql, connection))
                {
                    command.Parameters.AddWithValue("@ProductID", productId);
                    connection.Open();
                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new ProductModel
                            {
                                ProductID = reader.GetInt32(0),
                                ProductName = reader.GetString(1),
                                UnitPrice = reader.GetDecimal(2),
                                UnitsInStock = reader.GetInt16(3),
                            };
                        }
                    }
                }
            }
            return null;
        }
        /// <summary>
        /// 取得所有產品資料
        /// </summary>
        /// <returns></returns>
        internal List<ProductModel> GetProducts()
        {
            var products = new List<ProductModel>();
            using (var connection = new SqlConnection(_connectionString))
            {
                string sql = @"
                SELECT ProductID, ProductName, UnitPrice, UnitsInStock
                FROM Products
                ";
                using (var command = new SqlCommand(sql, connection))
                {
                    connection.Open();
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var product = new ProductModel
                            {
                                ProductID = reader.GetInt32(0),
                                ProductName = reader.GetString(1),
                                UnitPrice = reader.GetDecimal(2),
                                UnitsInStock = reader.GetInt16(3)
                            };
                            products.Add(product);
                        }
                    }
                }
            }
            return products;
        }
        /// <summary>
        /// 取得產品數量
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        internal int GetProductsCount()
        {
            string sql = @"
            SELECT COUNT(*)
            FROM Products
            ";
            
            using var connection = new SqlConnection(_connectionString);
            {
                using (var command = new SqlCommand(sql, connection))
                {
                    connection.Open();
                    return (int)command.ExecuteScalar();
                }
            }
        }
        /// <summary>
        /// 更新產品數量
        /// </summary>
        /// <param name="product"></param>
        /// <returns></returns>
        internal int? UpdateProduct(UpdateProductModel model)
        {
            // 無選擇產品、無法轉換為整數，回傳 null
            if (model?.ProductItem?.Selected == null || !int.TryParse(model.ProductItem.Selected, out int productId))
            {
                return null;
            }
            var quantity = model.Quantity;
            var type = model.Type?.Selected;

            using var connection = new SqlConnection(_connectionString);
            string sql = $@"
            UPDATE Products
            SET 
            UnitsInStock = UnitsInStock {(type == "增加" ? "+" : "-")} @Quantity
            OUTPUT
            inserted.UnitsInStock -- 返回更新後的 UnitsInStock
            WHERE
            ProductID=@ProductID
            ";
            using var command = new SqlCommand(sql, connection);
            command.Parameters.AddWithValue("@ProductID", productId);
            command.Parameters.AddWithValue("@Quantity", quantity);

            connection.Open();

            // 取得更新後的 UnitsInStock
            var result = command.ExecuteScalar();

            return result != null ? Convert.ToInt32(result) : null;
        }
        /// <summary>
        /// 新增訂單資料
        /// </summary>
        /// <param name="model"></param>
        internal void InsertOrder(OrderModel model)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                {
                    string sql = $@"
                        INSERT INTO Orders
                        (OrderDate)
                        values
                        (@OrderDate)
                        SELECT SCOPE_IDENTITY() -- 獲取自動生成的 OrderID
                        ";
                    using (var command = new SqlCommand(sql, connection))
                    {
                        command.Parameters.AddWithValue("@OrderDate", model.OrderDate);
                        connection.Open();
                        // 將自動生成的訂單 ID 賦值給 model.OrderID
                        model.OrderID = Convert.ToInt32(command.ExecuteScalar());
                    }

                    foreach (var orderDetail in model.OrderDetails)
                    {
                        string sqlDetail = $@"
                            INSERT INTO [Order Details]
                            (OrderID,ProductID,UnitPrice,Quantity)
                            values
                            (@OrderID,@ProductID,@UnitPrice,@Quantity)
                            ";
                        using (var commandDetail = new SqlCommand(sqlDetail, connection))
                        {
                            commandDetail.Parameters.AddWithValue("@OrderID", model.OrderID);
                            commandDetail.Parameters.AddWithValue("@ProductID", orderDetail.ProductID);
                            commandDetail.Parameters.AddWithValue("@UnitPrice", orderDetail.UnitPrice);
                            commandDetail.Parameters.AddWithValue("@Quantity", orderDetail.Quantity);
                            commandDetail.ExecuteNonQuery();
                        }
                    }
                }
            }
        }
    }
}

