using System.Collections.Generic;
using System.Threading.Tasks;
using Entitys;
using Interfaces.Generic;
using Models;

namespace Interfaces.Services
{
    public interface IPlantsServices : IGenericServices<PlantsEntity>
    {
        Task<List<PlantsList>> GetPlants(PlantsListaParametros parametros);
    }
}