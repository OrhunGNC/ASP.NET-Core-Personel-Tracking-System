using personelTrackingSystem.Application.Repositories;
using personelTrackingSystem.Application.Repositories.AnnualLeave;
using personelTrackingSystem.Application.Repositories.Department;
using personelTrackingSystem.Application.Repositories.Entry;
using personelTrackingSystem.Application.Repositories.LateArrival;
using personelTrackingSystem.Application.Repositories.Personel;
using personelTrackingSystem.Application.Repositories.Project;
using personelTrackingSystem.Application.Repositories.Salary;
using personelTrackingSystem.Application.Repositories.System;
using personelTrackingSystem.Application.Repositories.Team;
using personelTrackingSystem.Application.Repositories.User;
using personelTrackingSystem.Persistence.Contexts;
using personelTrackingSystem.Persistence.Repositories.AnnualLeave;
using personelTrackingSystem.Persistence.Repositories.Department;
using personelTrackingSystem.Persistence.Repositories.Entry;
using personelTrackingSystem.Persistence.Repositories.LateArrival;
using personelTrackingSystem.Persistence.Repositories.Personel;
using personelTrackingSystem.Persistence.Repositories.Project;
using personelTrackingSystem.Persistence.Repositories.Salary;
using personelTrackingSystem.Persistence.Repositories.System;
using personelTrackingSystem.Persistence.Repositories.Team;
using personelTrackingSystem.Persistence.Repositories.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Persistence.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly personelTrackingSystemDbContext _context;
        public UnitOfWork(personelTrackingSystemDbContext context)
        {
            _context = context;
        }
        public IAnnualLeaveReadRepository annualLeaveReadRepository =>  new AnnualLeaveReadRepository(_context);

        public IAnnualLeaveWriteRepository annualLeaveWriteRepository => new AnnualLeaveWriteRepository(_context);

        public IDepartmentReadRepository departmentReadRepository => new DepartmentReadRepository(_context);

        public IDepartmentWriteRepository departmentWriteRepository => new DepartmentWriteRepository(_context);

        public IEntryReadRepository entryReadRepository => new EntryReadRepository(_context);

        public IEntryWriteRepository entryWriteRepository => new EntryWriteRepository(_context);

        public ILateArrivalReadRepository lateArrivalReadRepository => new LateArrivalReadRepository(_context);

        public ILateArrivalWriteRepository lateArrivalWriteRepository => new LateArrivalWriteRepository(_context);

        public IPersonelReadRepository personelReadRepository => new PersonelReadRepository(_context);

        public IPersonelWriteRepository personelWriteRepository => new PersonelWriteRepository(_context);

        public IProjectReadRepository projectReadRepository => new ProjectReadRepository(_context);

        public IProjectWriteRepository projectWriteRepository => new ProjectWriteRepository(_context);

        public ISalaryReadRepository salaryReadRepository => new SalaryReadRepository(_context);

        public ISalaryWriteRepository salaryWriteRepository => new SalaryWriteRepository(_context);

        public ISystemReadRepository systemReadRepository => new SystemReadRepository(_context);

        public ISystemWriteRepository systemWriteRepository => new SystemWriteRepository(_context);

        public ITeamReadRepository teamReadRepository => new TeamReadRepository(_context);

        public ITeamWriteRepository teamWriteRepository => new TeamWriteRepository(_context);

        public IUserReadRepository userReadRepository => new UserReadRepository(_context);

        public IUserWriteRepository userWriteRepository => new UserWriteRepository(_context);

        public void Dispose()
        {
            _context.Dispose();
        }
        public void Save() => _context.SaveChanges();
    }
}
