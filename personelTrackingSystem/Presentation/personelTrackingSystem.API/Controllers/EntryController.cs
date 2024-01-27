using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using personelTrackingSystem.Application.Repositories;
using personelTrackingSystem.Application.ViewModels;
using personelTrackingSystem.Domain.Entities;

namespace personelTrackingSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntryController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        public EntryController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var entryList = _uow.entryReadRepository.GetAll();
                return Ok(entryList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Interval Server Error: {ex.Message}");
            }


        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var entry = _uow.entryReadRepository.GetFirstOrDefault(x => x.Id == id);
            if (entry == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(entry);
            }
        }
        [HttpPost]
        public IActionResult Create([FromBody] EntryEntityVM entryVM)
        {
            var entryEntity = new EntryEntity
            {
                CreatedDate = DateTime.Now,
                PersonelId= entryVM.PersonelId,
                EntryDate = entryVM.EntryDate,
                ExitDate = entryVM.ExitDate,
                Status = entryVM.Status,
            };
            _uow.entryWriteRepository.Add(entryEntity);
            _uow.Save();
            return Ok();
        }
        [HttpPut]
        public IActionResult Update([FromBody] EntryEntityVM entryVM)
        {

            var entryEntity = new EntryEntity
            {
                Id = entryVM.Id,
                CreatedDate = entryVM.CreatedDate,
                UpdatedDate = DateTime.Now,
                PersonelId = entryVM.PersonelId,
                EntryDate = entryVM.EntryDate,
                ExitDate = entryVM.ExitDate,
                Status = entryVM.Status,

            };
            _uow.entryWriteRepository.Update(entryEntity);
            _uow.Save();
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var entry = _uow.entryReadRepository.GetFirstOrDefault(x => x.Id == id);
            if (entry == null)
            {
                return NotFound();
            }
            else
            {
                _uow.entryWriteRepository.Remove(entry);
                _uow.Save();
                return NoContent();
            }

        }
    }
}
