using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using personelTrackingSystem.Application.Repositories;
using personelTrackingSystem.Application.ViewModels;
using personelTrackingSystem.Domain.Entities;

namespace personelTrackingSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SystemController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        public SystemController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var systemList = _uow.systemReadRepository.GetAll();
                return Ok(systemList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Interval Server Error: {ex.Message}");
            }


        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var system = _uow.systemReadRepository.GetFirstOrDefault(x => x.Id == id);
            if (system == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(system);
            }
        }
        [HttpPost]
        public IActionResult Create([FromBody] SystemEntityVM systemVM)
        {
            var systemEntity = new SystemEntity
            {
                CreatedDate = DateTime.Now,
                AboutUs=systemVM.AboutUs,
                Communication=systemVM.Communication,
                ApplicationName=systemVM.ApplicationName,
            };
            _uow.systemWriteRepository.Add(systemEntity);
            _uow.Save();
            return Ok();
        }
        [HttpPut]
        public IActionResult Update([FromBody] SystemEntityVM systemVM)
        {

            var systemEntity = new SystemEntity
            {
                Id = systemVM.Id,
                CreatedDate = systemVM.CreatedDate,
                UpdatedDate = DateTime.Now,
                AboutUs = systemVM.AboutUs,
                Communication = systemVM.Communication,
                ApplicationName = systemVM.ApplicationName,

            };
            _uow.systemWriteRepository.Update(systemEntity);
            _uow.Save();
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var system = _uow.systemReadRepository.GetFirstOrDefault(x => x.Id == id);
            if (system == null)
            {
                return NotFound();
            }
            else
            {
                _uow.systemWriteRepository.Remove(system);
                _uow.Save();
                return NoContent();
            }

        }
    }
}
