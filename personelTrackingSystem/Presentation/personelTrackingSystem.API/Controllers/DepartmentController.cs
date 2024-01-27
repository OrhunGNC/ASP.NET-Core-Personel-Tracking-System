using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using personelTrackingSystem.Application.ViewModels;
using personelTrackingSystem.Application.Repositories;
using personelTrackingSystem.Domain.Entities;

namespace personelTrackingSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        public DepartmentController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var departmentList = _uow.departmentReadRepository.GetAll();
                return Ok(departmentList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Interval Server Error: {ex.Message}");
            }
        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            
                var department = _uow.departmentReadRepository.GetFirstOrDefault(x => x.Id == id);
            if (department == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(department);
            }

        }
        [HttpPost]
        public IActionResult Create([FromBody] DepartmentEntityVM departmentVM)
        {
            var departmentEntity = new DepartmentEntity
            {
                CreatedDate = DateTime.Now,
                DepartmentName = departmentVM.DepartmentName,
                DepartmentHead = departmentVM.DepartmentHead,
            };
            _uow.departmentWriteRepository.Add(departmentEntity);
            _uow.Save();
            return Ok();
        }
        [HttpPut]
        public IActionResult Update([FromBody] DepartmentEntityVM departmentVM)
        {

            var departmentEntity = new DepartmentEntity
            {
                Id = departmentVM.Id,
                CreatedDate = departmentVM.CreatedDate,
                UpdatedDate = DateTime.Now,
                DepartmentName = departmentVM.DepartmentName,
                DepartmentHead = departmentVM.DepartmentHead,
            };
            _uow.departmentWriteRepository.Update(departmentEntity);
            _uow.Save();
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var department = _uow.departmentReadRepository.GetFirstOrDefault(x => x.Id == id);
            if (department == null)
            {
                return NotFound();
            }
            else
            {
                _uow.departmentWriteRepository.Remove(department);
                _uow.Save();
                return NoContent();
            }

        }

    }
}
