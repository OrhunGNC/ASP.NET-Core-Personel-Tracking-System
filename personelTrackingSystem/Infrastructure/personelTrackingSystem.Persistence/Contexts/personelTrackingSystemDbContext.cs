using personelTrackingSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection;
using personelTrackingSystem.Domain.Entities.Common;
using personelTrackingSystem.Application.ViewModels;

namespace personelTrackingSystem.Persistence.Contexts
{
    public class personelTrackingSystemDbContext:DbContext
    {
        public personelTrackingSystemDbContext(DbContextOptions<personelTrackingSystemDbContext> options) : base(options) { }
        public DbSet<PersonelEntity> Personels { get; set; }
        public DbSet<DepartmentEntity> Departments { get; set; }
        public DbSet<AnnualLeaveEntity> AnnualLeaves { get; set; }
        public DbSet<EntryEntity> Entries { get; set; }
        public DbSet<TeamEntity> Teams { get; set; }
        public DbSet<LateArrivalEntity> LateArrivals { get; set; }
        public DbSet<ProjectEntity> Projects { get; set; }
        public DbSet<SalaryEntity> Salaries { get; set; }
        public DbSet<SystemEntity> Systems { get; set; }
        public DbSet<UserEntity> Users { get; set; }
        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var datas = ChangeTracker.Entries<BaseEntity>();
            foreach(var data in datas)
            {
                _ = data.State switch
                {
                    EntityState.Added => data.Entity.CreatedDate=DateTime.UtcNow,
                    EntityState.Modified=>data.Entity.UpdatedDate=DateTime.UtcNow,
                    _=>DateTime.UtcNow
                };
            }
            return await base.SaveChangesAsync(cancellationToken);
        }

    }
}
