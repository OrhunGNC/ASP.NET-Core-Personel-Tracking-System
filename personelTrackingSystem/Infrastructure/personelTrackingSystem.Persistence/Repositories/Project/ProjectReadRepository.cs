using Microsoft.EntityFrameworkCore;
using personelTrackingSystem.Application.Repositories.Project;
using personelTrackingSystem.Domain.Entities;
using personelTrackingSystem.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Persistence.Repositories.Project
{
    public class ProjectReadRepository : ReadRepository<ProjectEntity>,IProjectReadRepository
    {
        public ProjectReadRepository(personelTrackingSystemDbContext context) : base(context)
        {

        }
    }
}
