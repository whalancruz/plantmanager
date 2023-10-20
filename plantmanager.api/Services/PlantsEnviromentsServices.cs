using Entitys;
using Interfaces.Services;
using Microsoft.Extensions.Configuration;
using Util.Generic;

namespace Services
{
    public class PlantsEnviromentsServices : GenericServices<PlantsEnvironmentsEntity>, IPlantsEnviromentsServices
    {
        public IConfiguration _configuration { get; }

        public PlantsEnviromentsServices(DbContexto dbContexto, IConfiguration configuration) : base(dbContexto)
        {
            _configuration = configuration;
        }

    }
}