using Ede.Uofx.Customize.Web.Models;
using Microsoft.Data.SqlClient;

namespace Ede.Uofx.Customize.Web.Service
{
    public class ValidationService
    {
        private readonly IConfiguration _configuration;        
        private readonly string _connectionString;

        public ValidationService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("Default");
        }
        /// <summary>
        /// 檢查庫存數量
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        internal bool CheckStock(StockCheckModel model)
        {
            // 異動類型為"減少"時，進行庫存檢查
            if(model.Type.Selected == "減少")
            {
                return model.Stock >= model.Quantity;
            }
            return true;
        }
    }
}