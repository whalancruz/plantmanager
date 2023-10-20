using System.Threading.Tasks;
using Entitys;
using Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using Models;
using Ninject;
using uteis;

namespace Controllers
{
    public class PlantsController : GenericController<IPlantsServices, PlantsEntity>
    {

        IPlantsServices _plantsServices;

        public PlantsController(IKernel kernel) : base(kernel.Get<IPlantsServices>())
        {
            _plantsServices = kernel.Get<IPlantsServices>();
        }

        [HttpGet("GetList")]
        public async Task<ActionResult> GetList(PlantsListaParametros parametros)
        {
            return Ok(await _plantsServices.GetPlants(parametros));
        }


    }
}