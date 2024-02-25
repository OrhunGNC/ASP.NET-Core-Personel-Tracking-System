using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using personelTrackingSystem.Application.Repositories;
using personelTrackingSystem.Application.ViewModels;
using personelTrackingSystem.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using System.Text.Json.Serialization;
using Newtonsoft.Json;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

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
                Phone= userVM.Phone,
                Role=userVM.Role
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
                Phone = userVM.Phone,
                Role = userVM.Role
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
        [HttpPost("[action]")]
        public IActionResult Login([FromBody] LoginVM userVM)
        {
            var userEntity = new UserEntity
            {
                EMail = userVM.EMail,
                Password = userVM.Password,
            };
            
            var user = _uow.userReadRepository.GetFirstOrDefault(x => x.EMail == userEntity.EMail && x.Password == userEntity.Password);
            if (user == null)
            {
                return Unauthorized();
            }
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name,user.EMail),
                new Claim(ClaimTypes.Role,user.Role)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("my top secret key  12345678901234567890123456789012"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return Ok(jwt);
        }
    }
}
