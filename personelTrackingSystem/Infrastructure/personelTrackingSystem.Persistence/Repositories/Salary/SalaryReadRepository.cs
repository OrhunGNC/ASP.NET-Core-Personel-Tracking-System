using Microsoft.EntityFrameworkCore;
using personelTrackingSystem.Application.Repositories.Salary;
using personelTrackingSystem.Domain.Entities;
using personelTrackingSystem.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Persistence.Repositories.Salary
{
    public class SalaryReadRepository : ReadRepository<SalaryEntity>,ISalaryReadRepository
    {
        public SalaryReadRepository(personelTrackingSystemDbContext context) : base(context)
        {

        }
    }
}
