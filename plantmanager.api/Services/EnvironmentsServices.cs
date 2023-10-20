using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Entitys;
using Interfaces.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Models;
using Util.Generic;

namespace Services
{
    public class EnvironmentsServices : GenericServices<EnvironmentsEntity>, IEnvironmentsServices
    {
        public IConfiguration _configuration { get; }
        private readonly IMapper _mapper;

        public EnvironmentsServices(DbContexto dbContexto, IConfiguration configuration, IMapper mapper) : base(dbContexto)
        {
            _configuration = configuration;
            _mapper = mapper;
        }

        public async Task<List<EnvironmentsList>> GetEnvironments()
        {
            var query = DbQueryable();

            return _mapper.Map<List<EnvironmentsList>>(await query.ToListAsync());
        }
        
    }
}