using System.Threading.Tasks;
using Entitys;
using Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using Ninject;
using uteis;

namespace Controllers
{
    public class EnvironmentsController : GenericController<IEnvironmentsServices, EnvironmentsEntity>
    {
        IEnvironmentsServices _environmentsEntity;

        public EnvironmentsController(IKernel kernel) : base(kernel.Get<IEnvironmentsServices>())
        {
            _environmentsEntity = kernel.Get<IEnvironmentsServices>();
        }

        [HttpGet("GetList")]
        public async Task<ActionResult> GetList()
        {
            return Ok(await _environmentsEntity.GetEnvironments());
        }

    }
}