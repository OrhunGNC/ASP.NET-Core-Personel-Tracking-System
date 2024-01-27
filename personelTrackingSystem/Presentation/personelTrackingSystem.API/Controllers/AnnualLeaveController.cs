using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using personelTrackingSystem.Application.Repositories;
using personelTrackingSystem.Application.ViewModels;
using personelTrackingSystem.Domain.Entities;

namespace personelTrackingSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnnualLeaveController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        public AnnualLeaveController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var annualList = _uow.annualLeaveReadRepository.GetAll();
                return Ok(annualList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Interval Server Error: {ex.Message}");
            }


        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var annual = _uow.annualLeaveReadRepository.GetFirstOrDefault(x => x.Id == id);
            if (annual == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(annual);
            }
        }
        [HttpPost]
        public IActionResult Create([FromBody] AnnualLeaveEntityVM annualVM)
        {
            var annualEntity = new AnnualLeaveEntity
            {
                CreatedDate = DateTime.Now,
                PersonelId = annualVM.PersonelId,
                LeaveStartDate= annualVM.LeaveStartDate,
                LeaveEndDate= annualVM.LeaveEndDate,
                ApprovalStatus= annualVM.ApprovalStatus,
                LeaveApplicationDate= annualVM.LeaveApplicationDate,
            };
            _uow.annualLeaveWriteRepository.Add(annualEntity);
            _uow.Save();
            return Ok();
        }
        [HttpPut]
        public IActionResult Update([FromBody] AnnualLeaveEntityVM annualVM)
        {

            var annualEntity = new AnnualLeaveEntity
            {
                Id=annualVM.Id,
                CreatedDate = annualVM.CreatedDate,
                UpdatedDate=DateTime.Now,
                PersonelId = annualVM.PersonelId,
                LeaveStartDate = annualVM.LeaveStartDate,
                LeaveEndDate = annualVM.LeaveEndDate,
                ApprovalStatus = annualVM.ApprovalStatus,
                LeaveApplicationDate = annualVM.LeaveApplicationDate,
            };
            _uow.annualLeaveWriteRepository.Update(annualEntity);
            _uow.Save();
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var annual = _uow.annualLeaveReadRepository.GetFirstOrDefault(x => x.Id == id);
            if (annual == null)
            {
                return NotFound();
            }
            else
            {
                _uow.annualLeaveWriteRepository.Remove(annual);
                _uow.Save();
                return NoContent();
            }

        }
    }
}
