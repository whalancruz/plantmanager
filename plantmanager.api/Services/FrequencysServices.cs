using Entitys;
using Interfaces.Services;
using Microsoft.Extensions.Configuration;
using Ninject;
using Util.Generic;

namespace Services
{
    public class FrequencysServices : GenericServices<FrequencysEntity>, IFrequencysServices
    {
        public IConfiguration _configuration { get; }

        public FrequencysServices(DbContexto dbContexto, IConfiguration configuration, IKernel kernel) : base(dbContexto)
        {
            _configuration = configuration;
        }
    }
}