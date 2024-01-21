using Microsoft.EntityFrameworkCore;
using personelTrackingSystem.Application.Repositories.Project;
using personelTrackingSystem.Domain.Entities;
using personelTrackingSystem.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Persistence.Repositories.Project
{
    public class ProjectWriteRepository : WriteRepository<ProjectEntity>,IProjectWriteRepository
    {
        public ProjectWriteRepository(personelTrackingSystemDbContext context) : base(context)
        {

        }
    }
}
