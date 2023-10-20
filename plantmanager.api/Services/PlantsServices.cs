using System.Collections.Generic;
using System.Linq;
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
    public class PlantsServices : GenericServices<PlantsEntity>, IPlantsServices
    {

        public IConfiguration _configuration { get; }

        private readonly IMapper _mapper;
        public PlantsServices(DbContexto dbContexto, IConfiguration configuration, IMapper mapper) : base(dbContexto)
        {
            _configuration = configuration;
            _mapper = mapper;
        }

        public async Task<List<PlantsList>> GetPlants(PlantsListaParametros parametros)
        {
            List<PlantsList> plants = new List<PlantsList>();

            var query = DbQueryable()
                                    .Include(x => x.PlantsEnvironmentsEntity)
                                    .ThenInclude(x => x.EnvironmentsEntity)
                                    .Include(b => b.PlantsFrequencysEntity)
                                    .ThenInclude(c => c!.FrequencysEntity)
                                    .OrderBy(x => x.Name)
                                    .Skip((parametros.pageAtual - 1) * parametros.pageSize)
                                    .Take(parametros.pageSize);

            if (!string.IsNullOrEmpty(parametros.sort))
            {
                switch (parametros.sort.ToLower())
                {
                    case "name":
                        query = query.OrderBy(x => x.Name);
                        break;
                };
            };

            if (!string.IsNullOrEmpty(parametros.filter) && parametros.filter != "all")
            {
                query = query.Where(x => x.PlantsEnvironmentsEntity.Any(pe => pe.EnvironmentsEntity.Key == parametros.filter));
            };

            return _mapper.Map<List<PlantsList>>(await query.ToListAsync());
        }
    }
}