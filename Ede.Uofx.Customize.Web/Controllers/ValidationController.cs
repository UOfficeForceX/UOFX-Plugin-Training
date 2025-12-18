using Ede.Uofx.Customize.Web.Models;
using Ede.Uofx.Customize.Web.Service;
using Microsoft.AspNetCore.Mvc;

namespace Ede.Uofx.Customize.Web.Controllers
{
    [Route("api/validation")]
    [ApiController]
    [Produces("application/json")]
    public class ValidationController : ControllerBase
    {

        private readonly ValidationService _validationService;

        public ValidationController(ValidationService validationService)
        {
            _validationService = validationService;
        }

        [HttpPost("check-stock")]
        public IActionResult CheckStock([Bind] StockCheckModel model)
        {
            try
            {
                bool result = _validationService.CheckStock(model.Quantity, model.Stock);
                return result ? Ok(true) : Ok("數量不可大於庫存!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
