using personelTrackingSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection;

namespace personelTrackingSystem.Persistence.Contexts
{
    public class personelTrackingSystemDbContext:DbContext
    {
        public personelTrackingSystemDbContext(DbContextOptions<personelTrackingSystemDbContext> options) : base(options) { }
        public DbSet<PersonelEntity> Personels { get; set; }
        public DbSet<DepartmentEntity> Departments { get; set; }
        public DbSet<AnnualLeaveEntity> AnnualLeaves { get; set; }
        public DbSet<EntryEntity> Entries { get; set; }
        public DbSet<LateArrivalEntity> LateArrivals { get; set; }
        public DbSet<ProjectEntity> Projects { get; set; }
        public DbSet<SalaryEntity> Salaries { get; set; }
        public DbSet<SystemEntity> Systems { get; set; }
        public DbSet<UserEntity> Users { get; set; }


    }
}
