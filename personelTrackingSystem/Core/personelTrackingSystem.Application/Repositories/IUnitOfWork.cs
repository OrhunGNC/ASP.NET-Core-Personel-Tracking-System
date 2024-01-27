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
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Application.Repositories
{
    public interface IUnitOfWork:IDisposable
    {
        public IAnnualLeaveReadRepository annualLeaveReadRepository { get; }
        public IAnnualLeaveWriteRepository annualLeaveWriteRepository { get; }
        public IDepartmentReadRepository departmentReadRepository { get; }  
        public IDepartmentWriteRepository departmentWriteRepository { get; }
        public IEntryReadRepository entryReadRepository { get; }
        public IEntryWriteRepository entryWriteRepository { get; }
        public ILateArrivalReadRepository   lateArrivalReadRepository { get; }
        public ILateArrivalWriteRepository lateArrivalWriteRepository { get; }  
        public IPersonelReadRepository personelReadRepository { get; }
        public IPersonelWriteRepository personelWriteRepository { get; }
        public IProjectReadRepository   projectReadRepository { get; }
        public IProjectWriteRepository projectWriteRepository { get; }
        public ISalaryReadRepository salaryReadRepository { get; }  
        public ISalaryWriteRepository salaryWriteRepository { get; }
        public ISystemReadRepository systemReadRepository { get; }
        public ISystemWriteRepository systemWriteRepository { get; }
        public ITeamReadRepository teamReadRepository { get; }
        public ITeamWriteRepository teamWriteRepository { get; }
        public IUserReadRepository userReadRepository { get; }
        public IUserWriteRepository userWriteRepository { get; }
        void Save();
    }
}
