using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using personelTrackingSystem.Application.Repositories;
using personelTrackingSystem.Application.ViewModels;
using personelTrackingSystem.Domain.Entities;
using System.Linq.Expressions;
using System.Net;
using System.Numerics;

namespace personelTrackingSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonelController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        public PersonelController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var personelList = _uow.personelReadRepository.GetAll();
                return Ok(personelList);
            }
            catch(Exception ex)
            {
                return StatusCode(500, $"Interval Server Error: {ex.Message}");
            }

            
        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var personel = _uow.personelReadRepository.GetFirstOrDefault(x => x.Id == id);
            if(personel == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(personel);
            }
        }
        [HttpPost]
        public IActionResult Create([FromBody] PersonelEntityVM personelVM)
        {
            var personelEntity = new PersonelEntity
            {
                CreatedDate= DateTime.Now,
                NameSurname=personelVM.NameSurname,
                Phone = personelVM.Phone,
                Gender = personelVM.Gender,
                DepartmentId = personelVM.DepartmentId,
            };
            _uow.personelWriteRepository.Add(personelEntity);
            _uow.Save();
            return Ok();
        }
        [HttpPut]
        public IActionResult Update([FromBody] PersonelEntityVM personelVM)
        {

            var personelEntity = new PersonelEntity
            {
                Id = personelVM.Id,
                CreatedDate = personelVM.CreatedDate,
                UpdatedDate= DateTime.Now,
                NameSurname = personelVM.NameSurname,
                Gender = personelVM.Gender,
                Phone = personelVM.Phone,
                DepartmentId = personelVM.DepartmentId,
            };
            _uow.personelWriteRepository.Update(personelEntity);
            _uow.Save();
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var personel = _uow.personelReadRepository.GetFirstOrDefault(x => x.Id == id);
            if (personel == null)
            {
                return NotFound();
            }
            else
            {
                _uow.personelWriteRepository.Remove(personel);
                _uow.Save();
                return NoContent();
            }

        }
    }
}
