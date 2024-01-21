using Microsoft.EntityFrameworkCore;
using personelTrackingSystem.Application.Repositories.AnnualLeave;
using personelTrackingSystem.Application.Repositories.Project;
using personelTrackingSystem.Domain.Entities;
using personelTrackingSystem.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Persistence.Repositories.AnnualLeave
{
    public class AnnualLeaveReadRepository : ReadRepository<AnnualLeaveEntity>,IAnnualLeaveReadRepository
    {
        public AnnualLeaveReadRepository(personelTrackingSystemDbContext context) : base(context)
        {

        }
    }
}
