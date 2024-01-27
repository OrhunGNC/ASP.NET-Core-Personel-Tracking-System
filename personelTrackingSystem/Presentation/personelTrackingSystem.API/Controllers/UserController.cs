using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using personelTrackingSystem.Application.Repositories;
using personelTrackingSystem.Application.ViewModels;
using personelTrackingSystem.Domain.Entities;

namespace personelTrackingSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        public UserController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var userList = _uow.userReadRepository.GetAll();
                return Ok(userList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Interval Server Error: {ex.Message}");
            }


        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _uow.userReadRepository.GetFirstOrDefault(x => x.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(user);
            }
        }
        [HttpPost]
        public IActionResult Create([FromBody] UserEntityVM userVM)
        {
            var userEntity = new UserEntity
            {
                CreatedDate = DateTime.Now,
                EMail= userVM.EMail,
                Password= userVM.Password,
                NameSurname= userVM.NameSurname,
                Phone= userVM.Phone
            };
            _uow.userWriteRepository.Add(userEntity);
            _uow.Save();
            return Ok();
        }
        [HttpPut]
        public IActionResult Update([FromBody] UserEntityVM userVM)
        {

            var userEntity = new UserEntity
            {
                Id = userVM.Id,
                CreatedDate = userVM.CreatedDate,
                UpdatedDate = DateTime.Now,
                EMail = userVM.EMail,
                Password = userVM.Password,
                NameSurname = userVM.NameSurname,
                Phone = userVM.Phone

            };
            _uow.userWriteRepository.Update(userEntity);
            _uow.Save();
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = _uow.userReadRepository.GetFirstOrDefault(x => x.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            else
            {
                _uow.userWriteRepository.Remove(user);
                _uow.Save();
                return NoContent();
            }

        }
    }
}
