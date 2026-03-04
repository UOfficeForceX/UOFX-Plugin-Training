using Microsoft.AspNetCore.Mvc;

namespace Ede.Uofx.Customize.Web.Controllers
{
    [Route("api/emp")]
    [ApiController]
    [Produces("application/json")]
    public class EmployeeController : ControllerBase
    {
        public EmployeeController()
        {

        }

        [HttpGet("validemp")]
        public IActionResult GetValidEmpNumber()
        {
            return Ok(new List<string>() { "A001", "A002" });
        }
    }
}
