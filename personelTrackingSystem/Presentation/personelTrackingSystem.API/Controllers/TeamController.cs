using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using personelTrackingSystem.Application.Repositories;
using personelTrackingSystem.Application.ViewModels;
using personelTrackingSystem.Domain.Entities;

namespace personelTrackingSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        public TeamController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var teamList = _uow.teamReadRepository.GetAll();
                return Ok(teamList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Interval Server Error: {ex.Message}");
            }


        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var team = _uow.teamReadRepository.GetFirstOrDefault(x => x.Id == id);
            if (team == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(team);
            }
        }
        [HttpPost]
        public IActionResult Create([FromBody] TeamEntityVM teamVM)
        {
            var teamEntity = new TeamEntity
            {
                CreatedDate = DateTime.Now,
                TeamName=teamVM.TeamName,
                CreationDate=teamVM.CreationDate,
                TeamStatus=teamVM.TeamStatus,
                Description=teamVM.Description,
                PriorityLevel=teamVM.PriorityLevel,
                TeamBudget=teamVM.TeamBudget,
            };
            _uow.teamWriteRepository.Add(teamEntity);
            _uow.Save();
            return Ok();
        }
        [HttpPut]
        public IActionResult Update([FromBody] TeamEntityVM teamVM)
        {

            var teamEntity = new TeamEntity
            {
                Id = teamVM.Id,
                CreatedDate = teamVM.CreatedDate,
                UpdatedDate = DateTime.Now,
                TeamName = teamVM.TeamName,
                CreationDate = teamVM.CreationDate,
                TeamStatus = teamVM.TeamStatus,
                Description = teamVM.Description,
                PriorityLevel = teamVM.PriorityLevel,
                TeamBudget = teamVM.TeamBudget,

            };
            _uow.teamWriteRepository.Update(teamEntity);
            _uow.Save();
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var team = _uow.teamReadRepository.GetFirstOrDefault(x => x.Id == id);
            if (team == null)
            {
                return NotFound();
            }
            else
            {
                _uow.teamWriteRepository.Remove(team);
                _uow.Save();
                return NoContent();
            }

        }
    }
}
