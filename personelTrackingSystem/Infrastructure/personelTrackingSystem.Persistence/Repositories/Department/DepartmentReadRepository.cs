using Microsoft.EntityFrameworkCore;
using personelTrackingSystem.Application.Repositories.Department;
using personelTrackingSystem.Domain.Entities;
using personelTrackingSystem.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Persistence.Repositories.Department
{
    public class DepartmentReadRepository : ReadRepository<DepartmentEntity>,IDepartmentReadRepository
    {
      public DepartmentReadRepository(personelTrackingSystemDbContext context) : base(context)
        {

        } 
    }
}
