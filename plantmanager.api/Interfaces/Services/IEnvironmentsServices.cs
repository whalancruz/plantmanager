using System.Collections.Generic;
using System.Threading.Tasks;
using Entitys;
using Interfaces.Generic;
using Models;

namespace Interfaces.Services
{
    public interface IEnvironmentsServices : IGenericServices<EnvironmentsEntity>
    {
        Task<List<EnvironmentsList>> GetEnvironments();
    }
}