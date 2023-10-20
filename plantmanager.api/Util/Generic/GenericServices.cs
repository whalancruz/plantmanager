using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entitys;
using Interfaces.Generic;
using Microsoft.EntityFrameworkCore;

namespace Util.Generic
{
    public class GenericServices<TEntity> : IGenericServices<TEntity> where TEntity : BaseEntity
    {

        public DbContexto _dbContexto;

        public GenericServices(DbContexto dbContexto)
        {
            _dbContexto = dbContexto;
        }

        public DbContexto DbContexto() => _dbContexto;
        public IQueryable<TEntity> DbQueryable() => _dbContexto.Set<TEntity>().Where(x => x.RemoveAt == null);

        public async Task<TEntity> AddAsync(TEntity entity)
        {
            entity = this.onPrevInsert(entity);

            _dbContexto.Set<TEntity>().Add(entity);
            await _dbContexto.SaveChangesAsync();
            return entity;
        }

        public async Task<List<TEntity>> GetAllAsync()
        {
            List<TEntity> entity = await _dbContexto.Set<TEntity>().ToListAsync();

            return entity;
        }

        public async Task<TEntity> GetByIdAsync(long id)
        {
            var entity = await _dbContexto.Set<TEntity>().FindAsync(id);
            if (entity == null) throw new NotFoundException($"A entidade {typeof(TEntity)} com o ID {id} não foi encontrada no banco de dados.");
            return entity;
        }

        public async Task<TEntity> UpdateAsync(long id, TEntity entity)
        {
            // Verifica se a entidade existe no banco de dados
            var existingEntity = await _dbContexto.Set<TEntity>().FindAsync(id);
            if (existingEntity == null) throw new NotFoundException($"A entidade {entity} com o ID {id} não foi encontrada no banco de dados.");

            entity.Id = existingEntity.Id;
            entity.UpdateAt = DateTime.UtcNow;

            entity = this.onPrevUpdate(entity);

            _dbContexto.Set<TEntity>().Entry(existingEntity).CurrentValues.SetValues(entity);
            await _dbContexto.SaveChangesAsync();
            return entity;
        }

        public async Task<TEntity> DeleteAsync(long id)
        {
            // Verifica se a entidade existe no banco de dados
            var existingEntity = await _dbContexto.Set<TEntity>().FindAsync(id);
            if (existingEntity == null) throw new NotFoundException($"A entidade com o ID {id} não foi encontrada no banco de dados.");

            existingEntity.RemoveAt = DateTime.UtcNow;

            _dbContexto.Set<TEntity>().Entry(existingEntity).CurrentValues.SetValues(existingEntity);
            await _dbContexto.SaveChangesAsync();
            return existingEntity;
        }

        public virtual TEntity onPrevUpdate(TEntity entity) { return entity; }
        public virtual TEntity onPrevInsert(TEntity entity) { return entity; }

    }
}