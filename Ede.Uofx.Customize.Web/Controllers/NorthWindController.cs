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
        public IActionResult GetCustomers(int page, int limit)
        {
            try
            {
                return Ok(_northWindService.GetCustomers(page, limit));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("categories")]
        public IActionResult GetCategories()
        {
            return Ok(_northWindService.GetCategories());
        }

        [HttpPost("products/by-category")]
        public IActionResult GetProductsByCategory([Bind] ProductGetByCategoryExternalModel model)
        {
            if (model?.CategoryID?.Selected == null)
            {
                return Ok(new List<ProductModel>());
            }

            if (!int.TryParse(model.CategoryID.Selected, out int categoryId))
            {
                return BadRequest("Invalid CategoryID format.");
            }

            return Ok(_northWindService.GetProductsByCategory(categoryId));
        }

        [HttpPost("product")]
        public IActionResult GetProduct([Bind] ProductExternalModel model)
        {
            if (model?.ProductID?.Selected == null)
            {
                return Ok(new List<ProductModel>());
            }

            if (!int.TryParse(model.ProductID.Selected, out int productId))
            {
                return BadRequest("Invalid ProductID format.");
            }

            return Ok(_northWindService.GetProduct(productId));
        }

        [HttpGet("products")]
        public IActionResult GetProducts()
        {
            return Ok(_northWindService.GetProducts());
        }

        [HttpPost("product/update")]
        public IActionResult UpdateProduct([Bind] UpdateProductExternalModel model)
        {
            try
            {
                if (model?.ProductID?.Selected == null)
                {
                    return BadRequest("ProductID is required.");
                }

                if (!int.TryParse(model.ProductID.Selected, out int productId))
                {
                    return BadRequest("Invalid ProductID format.");
                }

                var product = new UpdateProductModel
                {
                    ProductID = productId,
                    Quantity = model.Quantity
                };

                return Ok(_northWindService.UpdateProduct(product));
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
