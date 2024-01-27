using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using personelTrackingSystem.Application.Repositories;
using personelTrackingSystem.Application.ViewModels;
using personelTrackingSystem.Domain.Entities;

namespace personelTrackingSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LateArrivalController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        public LateArrivalController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var arrivalList = _uow.lateArrivalReadRepository.GetAll();
                return Ok(arrivalList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Interval Server Error: {ex.Message}");
            }


        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var arrival = _uow.lateArrivalReadRepository.GetFirstOrDefault(x => x.Id == id);
            if (arrival == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(arrival);
            }
        }
        [HttpPost]
        public IActionResult Create([FromBody] LateArrivalEntityVM arrivalVM)
        {
            var arrivalEntity = new LateArrivalEntity
            {
                CreatedDate = DateTime.Now,
                PersonelID=arrivalVM.PersonelID,
                LateArrivalDate=arrivalVM.LateArrivalDate,
                LateArrivalTime=arrivalVM.LateArrivalTime,
                Reason=arrivalVM.Reason,
                ApprovalStatus=arrivalVM.ApprovalStatus,
                Notes=arrivalVM.Notes,
            };
            _uow.lateArrivalWriteRepository.Add(arrivalEntity);
            _uow.Save();
            return Ok();
        }
        [HttpPut]
        public IActionResult Update([FromBody] LateArrivalEntityVM arrivalVM)
        {

            var arrivalEntity = new LateArrivalEntity
            {
                Id = arrivalVM.Id,
                CreatedDate = arrivalVM.CreatedDate,
                UpdatedDate = DateTime.Now,
                PersonelID = arrivalVM.PersonelID,
                LateArrivalDate = arrivalVM.LateArrivalDate,
                LateArrivalTime = arrivalVM.LateArrivalTime,
                Reason = arrivalVM.Reason,
                ApprovalStatus = arrivalVM.ApprovalStatus,
                Notes = arrivalVM.Notes,
            };
            _uow.lateArrivalWriteRepository.Update(arrivalEntity);
            _uow.Save();
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var arrival = _uow.lateArrivalReadRepository.GetFirstOrDefault(x => x.Id == id);
            if (arrival == null)
            {
                return NotFound();
            }
            else
            {
                _uow.lateArrivalWriteRepository.Remove(arrival);
                _uow.Save();
                return NoContent();
            }

        }
    }
}
