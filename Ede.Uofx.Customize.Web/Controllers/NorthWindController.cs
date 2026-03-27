using Ede.Uofx.Customize.Web.Models;
using Ede.Uofx.Customize.Web.Service;
using Microsoft.AspNetCore.Mvc;

namespace Ede.Uofx.Customize.Web.Controllers
{
    [Route("api/northwind")]
    [ApiController]
    [Produces("application/json")]
    public class NorthWindController : ControllerBase
    {
        private readonly NorthWindService _northWindService;

        public NorthWindController(NorthWindService northWindService)
        {
            _northWindService = northWindService;
        }

        [HttpGet("customer/{customerId}")]
        public IActionResult GetCustomer(string customerId)
        {
            return Ok(_northWindService.GetCustomer(customerId));
        }

        [HttpPost("customer/add")]
        public IActionResult InsertCustomer([Bind] CustomerModel model)
        {
            try
            {
                _northWindService.InsertCustomer(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("customer/update")]
        public IActionResult UpdateCustomer([Bind] CustomerModel model)
        {
            try
            {
                return Ok(_northWindService.UpdateCustomer(model));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("customer/delete/{customerId}")]
        public IActionResult DeleteCustomer(string customerId)
        {
            try
            {
                return Ok(_northWindService.DeleteCustomer(customerId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("customers")]
        public IActionResult GetCustomers()
        {
            return Ok(_northWindService.GetCustomers());
        }

        [HttpGet("categories")]
        public IActionResult GetCategories()
        {
            return Ok(_northWindService.GetCategories());
        }

        [HttpPost("products/by-category")]
        public IActionResult SearchProductsByCategory([Bind] SearchProductsByCategoryModel model)
        {
            return Ok(_northWindService.SearchProductsByCategory(model));
        }

        [HttpPost("products/by-page")]
        public IActionResult SearchProductsByPage([Bind] SearchProductsByPageModel model)
        {
            return Ok(_northWindService.SearchProductsByPage(model));
        }

        [HttpPost("product")]
        public IActionResult GetProduct([Bind] GetProductModel model)
        {
            return Ok(_northWindService.GetProduct(model));
        }

        [HttpGet("products")]
        public IActionResult GetProducts()
        {
            return Ok(_northWindService.GetProducts());
        }

        [HttpGet("products/count")]
        public IActionResult GetProductsCount()
        {
            return Ok(_northWindService.GetProductsCount());
        }

        [HttpPost("product/update")]
        public IActionResult UpdateProduct([Bind] UpdateProductModel model)
        {
            try
            {
                return Ok(_northWindService.UpdateProduct(model));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("order/add")]
        public IActionResult InsertOrder([Bind] OrderModel model)
        {
            try
            {
                _northWindService.InsertOrder(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
