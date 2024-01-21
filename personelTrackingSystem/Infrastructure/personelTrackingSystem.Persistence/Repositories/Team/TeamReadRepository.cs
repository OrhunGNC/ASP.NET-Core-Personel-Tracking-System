using Microsoft.EntityFrameworkCore;
using personelTrackingSystem.Application.Repositories.Team;
using personelTrackingSystem.Domain.Entities;
using personelTrackingSystem.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Persistence.Repositories.Team
{
    public class TeamReadRepository : ReadRepository<TeamEntity>,ITeamReadRepository
    {
        public TeamReadRepository(personelTrackingSystemDbContext context) : base(context)
        {

        }
    }
}
