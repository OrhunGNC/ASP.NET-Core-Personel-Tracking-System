using Microsoft.EntityFrameworkCore;
using personelTrackingSystem.Application.Repositories.Department;
using personelTrackingSystem.Domain.Entities;
using personelTrackingSystem.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Persistence.Repositories.Department
{
    public class DepartmentWriteRepository : WriteRepository<DepartmentEntity>,IDepartmentWriteRepository
    {
        public DepartmentWriteRepository(personelTrackingSystemDbContext context) : base(context)
        {

        }
    }
}
