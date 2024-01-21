using Microsoft.EntityFrameworkCore;
using personelTrackingSystem.Application.Repositories.AnnualLeave;
using personelTrackingSystem.Domain.Entities;
using personelTrackingSystem.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Persistence.Repositories.AnnualLeave
{
    public class AnnualLeaveWriteRepository : WriteRepository<AnnualLeaveEntity>,IAnnualLeaveWriteRepository
    {
        public AnnualLeaveWriteRepository(personelTrackingSystemDbContext context) : base(context)
        {

        }
    }
}
