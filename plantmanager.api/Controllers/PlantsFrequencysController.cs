using Entitys;
using Interfaces.Services;
using Ninject;
using uteis;

namespace Controllers
{
    public class PlantsFrequencysController : GenericController<IPlantsFrequencysServices, PlantsFrequencysEntity>
    {
        IPlantsFrequencysServices _plantsFrequencysServices;

        public PlantsFrequencysController(IKernel kernel) : base(kernel.Get<IPlantsFrequencysServices>())
        {
            _plantsFrequencysServices = kernel.Get<IPlantsFrequencysServices>();
        }

    }
}