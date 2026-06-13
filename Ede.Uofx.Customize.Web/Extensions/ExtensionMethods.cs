using System.Security.Cryptography;
using System.Text;

namespace Ede.Uofx.Customize.Web.Extensions
{
    public static class ExtensionMethods
    {
        public static string HMACSHA512(this string message, string key)
        {
            byte[] keyByte = Encoding.UTF8.GetBytes(key);
            byte[] messageBytes = Encoding.UTF8.GetBytes(message);
            using (var hmacSHA512 = new HMACSHA512(keyByte))
            {
                byte[] hashMessage = hmacSHA512.ComputeHash(messageBytes);
                return BitConverter.ToString(hashMessage).Replace("-", "").ToLower();
            }
        }
    }
}
