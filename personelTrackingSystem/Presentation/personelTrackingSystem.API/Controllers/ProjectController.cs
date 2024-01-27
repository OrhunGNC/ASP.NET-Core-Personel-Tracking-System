using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using personelTrackingSystem.Application.Repositories;
using personelTrackingSystem.Application.ViewModels;
using personelTrackingSystem.Domain.Entities;

namespace personelTrackingSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        public ProjectController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var projectList = _uow.projectReadRepository.GetAll();
                return Ok(projectList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Interval Server Error: {ex.Message}");
            }


        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var project = _uow.projectReadRepository.GetFirstOrDefault(x => x.Id == id);
            if (project == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(project);
            }
        }
        [HttpPost]
        public IActionResult Create([FromBody] ProjectEntityVM projectVM)
        {
            var projectEntity = new ProjectEntity
            {
                CreatedDate = DateTime.Now,
                ProjectName= projectVM.ProjectName,
                ProjectStart= projectVM.ProjectStart,
                ProjectEnd= projectVM.ProjectEnd,
                PersonelId= projectVM.PersonelId,
                ProjectStatus= projectVM.ProjectStatus,
            };
            _uow.projectWriteRepository.Add(projectEntity);
            _uow.Save();
            return Ok();
        }
        [HttpPut]
        public IActionResult Update([FromBody] ProjectEntityVM projectVM)
        {

            var projectEntity = new ProjectEntity
            {
                Id = projectVM.Id,
                CreatedDate = projectVM.CreatedDate,
                UpdatedDate = DateTime.Now,
                ProjectName = projectVM.ProjectName,
                ProjectStart = projectVM.ProjectStart,
                ProjectEnd = projectVM.ProjectEnd,
                PersonelId = projectVM.PersonelId,
                ProjectStatus = projectVM.ProjectStatus,

            };
            _uow.projectWriteRepository.Update(projectEntity);
            _uow.Save();
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var project = _uow.projectReadRepository.GetFirstOrDefault(x => x.Id == id);
            if (project == null)
            {
                return NotFound();
            }
            else
            {
                _uow.projectWriteRepository.Remove(project);
                _uow.Save();
                return NoContent();
            }

        }
    }
}
