using Microsoft.EntityFrameworkCore;
using personelTrackingSystem.Application.Repositories.System;
using personelTrackingSystem.Domain.Entities;
using personelTrackingSystem.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Persistence.Repositories.System
{
    public class SystemWriteRepository : WriteRepository<SystemEntity>,ISystemWriteRepository
    {
        public SystemWriteRepository(personelTrackingSystemDbContext context) : base(context)
        {

        }
    }
}
