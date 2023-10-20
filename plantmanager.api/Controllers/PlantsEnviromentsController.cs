using Entitys;
using Interfaces.Services;
using Ninject;
using uteis;

namespace Controllers
{
    public class PlantsEnviromentsController : GenericController<IPlantsEnviromentsServices, PlantsEnvironmentsEntity>
    {
        IPlantsEnviromentsServices _plantsEnviromentsServices;

        public PlantsEnviromentsController(IKernel kernel) : base(kernel.Get<IPlantsEnviromentsServices>())
        {
            _plantsEnviromentsServices = kernel.Get<IPlantsEnviromentsServices>();
        }

    }
}