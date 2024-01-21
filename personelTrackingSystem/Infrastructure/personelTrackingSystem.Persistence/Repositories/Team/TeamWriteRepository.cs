using Microsoft.EntityFrameworkCore;
using personelTrackingSystem.Application.Repositories.Team;
using personelTrackingSystem.Domain.Entities;
using personelTrackingSystem.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Persistence.Repositories.Team
{
    public class TeamWriteRepository : WriteRepository<TeamEntity>,ITeamWriteRepository
    {
        public TeamWriteRepository(personelTrackingSystemDbContext context) : base(context)
        {

        }
    }
}
