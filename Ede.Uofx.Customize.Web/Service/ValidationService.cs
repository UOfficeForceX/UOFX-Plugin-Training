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

        internal bool CheckStock(decimal quantity,decimal stock)
        {
            return stock >= quantity;
        }
    }
}