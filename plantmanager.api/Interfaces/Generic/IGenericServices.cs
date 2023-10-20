using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Interfaces.Generic
{
    public interface IGenericServices<TEntity>
    {
        Task<List<TEntity>> GetAllAsync();
        Task<TEntity> GetByIdAsync(long id);
        Task<TEntity> AddAsync(TEntity entity);
        Task<TEntity> UpdateAsync(long id, TEntity entity);
        Task<TEntity> DeleteAsync(long id);
        DbContexto DbContexto();
        IQueryable<TEntity> DbQueryable();
    }
}