using System.Threading.Tasks;
using Interfaces.Generic;
using Microsoft.AspNetCore.Mvc;

namespace uteis
{
    [Route("api/v1/[controller]")]
    public abstract class GenericController<TService, TEntity> : ControllerBase where TService : IGenericServices<TEntity>
    {
        private readonly TService _service;

        protected GenericController(TService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var entities = await _service.GetAllAsync();
            return Ok(entities);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetID(long id)
        {
            var entity = await _service.GetByIdAsync(id);
            return Ok(entity);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TEntity query)
        {
            await _service.AddAsync(query);
            return Ok(query);
        }

        [HttpPut("{Id}")]
        public async Task<ActionResult> Put(long id, [FromBody] TEntity query)
        {
            await _service.UpdateAsync(id, query);
            return Ok(query);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(long id)
        {
            var entity = await _service.GetByIdAsync(id);
            if (entity == null) return NotFound();

            await _service.DeleteAsync(id);
            return Ok(entity);
        }
    }
}