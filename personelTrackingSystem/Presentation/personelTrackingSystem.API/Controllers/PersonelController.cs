using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using personelTrackingSystem.Application.Repositories.Personel;
using personelTrackingSystem.Domain.Entities;
using System.Numerics;

namespace personelTrackingSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonelController : ControllerBase
    {
        private readonly IPersonelReadRepository _personelReadRepository;
        private readonly IPersonelWriteRepository _personelWriteRepository;
        public PersonelController(IPersonelReadRepository personelReadRepository, IPersonelWriteRepository personelWriteRepository)
        {
            _personelReadRepository = personelReadRepository;
            _personelWriteRepository = personelWriteRepository;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
           PersonelEntity personel= await _personelReadRepository.GetByIdAsync(id);
            return Ok(personel);
        }
    }
}
