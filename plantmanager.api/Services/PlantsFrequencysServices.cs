using Entitys;
using Interfaces.Services;
using Microsoft.Extensions.Configuration;
using Ninject;
using Util.Generic;

namespace Services
{
    public class PlantsFrequencysServices : GenericServices<PlantsFrequencysEntity>, IPlantsFrequencysServices
    {
        public IConfiguration _configuration { get; }

        public PlantsFrequencysServices(DbContexto dbContexto, IConfiguration configuration, IKernel kernel) : base(dbContexto)
        {
            _configuration = configuration;
        }

    }
}