using Ede.Uofx.Customize.Web.Models;
using Microsoft.Data.SqlClient;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Ede.Uofx.Customize.Web.Service
{
    public class SdkService
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public SdkService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("Default");
        }

        /// <summary>
        ///  新增一筆callback成功的資料
        /// </summary>
        /// <param name="item">新增的資料</param>
        internal void InsertSdkCallBack(SdkCallbackModel item)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                // 檢查表是否存在
                string checkTableSql = @"
                IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'SdkCallBack')
                BEGIN
                    CREATE TABLE SdkCallBack (
                        Type NVARCHAR(50),
                        Data NVARCHAR(MAX)
                    )
                END";

                using (var checkTableCommand = new SqlCommand(checkTableSql, connection))
                {
                    checkTableCommand.ExecuteNonQuery();
                }

                // 插入資料
                string insertSql = @"
                INSERT INTO SdkCallBack (Type, Data)
                VALUES (@Type, @Data)";

                using (var insertCommand = new SqlCommand(insertSql, connection))
                {
                    insertCommand.Parameters.AddWithValue("@Type", item.Type);
                    insertCommand.Parameters.AddWithValue("@Data", item.Data);

                    insertCommand.ExecuteNonQuery();
                }
            }
        }

        /// <summary>
        ///  取得Callback成功資料
        /// </summary>
        /// <returns></returns>
        internal List<SdkCallbackModel> GetSdkResult()
        {
            var result = new List<SdkCallbackModel>();

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                // 檢查表是否存在
                string checkTableSql = @"
                IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'SdkCallBack')
                BEGIN
                    SELECT 1 AS TableNotExists
                END
                ELSE
                BEGIN
                    SELECT 0 AS TableNotExists
                END";

                bool tableNotExists = false;
                using (var checkTableCommand = new SqlCommand(checkTableSql, connection))
                {
                    using (var reader = checkTableCommand.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            tableNotExists = reader.GetInt32(0) == 1;
                        }
                    }
                }

                // 如果表不存在，返回空陣列
                if (tableNotExists)
                {
                    return result;
                }

                // 從表中獲取資料
                string sql = @"
                SELECT Type, Data
                FROM SdkCallBack";

                using (var command = new SqlCommand(sql, connection))
                {
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var item = new SdkCallbackModel
                            {
                                Type = reader["Type"].ToString(),
                                Data = reader["Data"].ToString()
                            };
                            result.Add(item);
                        }
                    }
                }
            }

            return result;
        }
    }
}
