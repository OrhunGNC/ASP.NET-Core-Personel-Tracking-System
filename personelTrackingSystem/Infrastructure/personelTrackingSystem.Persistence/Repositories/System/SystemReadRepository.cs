using Microsoft.EntityFrameworkCore;
using personelTrackingSystem.Application.Repositories.System;
using personelTrackingSystem.Domain.Entities;
using personelTrackingSystem.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Persistence.Repositories.System
{
    public class SystemReadRepository : ReadRepository<SystemEntity>,ISystemReadRepository
    {
        public SystemReadRepository(personelTrackingSystemDbContext context) : base(context)
        {

        }
    }
}
