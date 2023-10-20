using Entitys;
using Interfaces.Services;
using Ninject;
using uteis;

namespace Controllers
{
    public class FrequencysController : GenericController<IFrequencysServices, FrequencysEntity>
    {

        IFrequencysServices _frequencysServices;

        public FrequencysController(IKernel kernel) : base(kernel.Get<IFrequencysServices>())
        {
            _frequencysServices = kernel.Get<IFrequencysServices>();
        }

    }
}