using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using personelTrackingSystem.Application.Repositories;
using personelTrackingSystem.Application.ViewModels;
using personelTrackingSystem.Domain.Entities;

namespace personelTrackingSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalaryController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        public SalaryController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var salaryList = _uow.salaryReadRepository.GetAll();
                return Ok(salaryList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Interval Server Error: {ex.Message}");
            }


        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var salary = _uow.salaryReadRepository.GetFirstOrDefault(x => x.Id == id);
            if (salary == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(salary);
            }
        }
        [HttpPost]
        public IActionResult Create([FromBody] SalaryEntityVM salaryVM)
        {
            var salaryEntity = new SalaryEntity
            {
                CreatedDate = DateTime.Now,
                PersonelId=salaryVM.PersonelId,
                PersonelSalary=salaryVM.PersonelSalary,
                SalaryDate=salaryVM.SalaryDate,
                IncreaseRate=salaryVM.IncreaseRate,
            };
            _uow.salaryWriteRepository.Add(salaryEntity);
            _uow.Save();
            return Ok();
        }
        [HttpPut]
        public IActionResult Update([FromBody] SalaryEntityVM salaryVM)
        {

            var salaryEntity = new SalaryEntity
            {
                Id = salaryVM.Id,
                CreatedDate = salaryVM.CreatedDate,
                UpdatedDate = DateTime.Now,
                PersonelId = salaryVM.PersonelId,
                PersonelSalary = salaryVM.PersonelSalary,
                SalaryDate = salaryVM.SalaryDate,
                IncreaseRate = salaryVM.IncreaseRate,
            };
            _uow.salaryWriteRepository.Update(salaryEntity);
            _uow.Save();
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var salary = _uow.salaryReadRepository.GetFirstOrDefault(x => x.Id == id);
            if (salary == null)
            {
                return NotFound();
            }
            else
            {
                _uow.salaryWriteRepository.Remove(salary);
                _uow.Save();
                return NoContent();
            }

        }
    }
}
