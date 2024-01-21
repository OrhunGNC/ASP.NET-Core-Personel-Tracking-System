using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using personelTrackingSystem.Persistence.Repositories;
using personelTrackingSystem.Application.Repositories;
using System.Threading.Tasks;
using personelTrackingSystem.Persistence.Repositories.AnnualLeave;
using personelTrackingSystem.Application.Repositories.AnnualLeave;
using personelTrackingSystem.Application.Repositories.Department;
using personelTrackingSystem.Persistence.Repositories.Department;
using personelTrackingSystem.Persistence.Repositories.Entry;
using personelTrackingSystem.Application.Repositories.Entry;
using personelTrackingSystem.Persistence.Repositories.LateArrival;
using personelTrackingSystem.Application.Repositories.LateArrival;
using personelTrackingSystem.Application.Repositories.Personel;
using personelTrackingSystem.Persistence.Repositories.Personel;
using personelTrackingSystem.Application.Repositories.Project;
using personelTrackingSystem.Persistence.Repositories.Project;
using personelTrackingSystem.Application.Repositories.Salary;
using personelTrackingSystem.Persistence.Repositories.Salary;
using personelTrackingSystem.Application.Repositories.Team;
using personelTrackingSystem.Persistence.Repositories.Team;
using personelTrackingSystem.Application.Repositories.User;
using personelTrackingSystem.Persistence.Repositories.User;

namespace personelTrackingSystem.Persistence
{
    public static class ServiceRegistration
    {
        public static void AddPersistenceServices(this IServiceCollection services)
        {
            services.AddScoped<IAnnualLeaveReadRepository, AnnualLeaveReadRepository>();
            services.AddScoped<IAnnualLeaveWriteRepository, AnnualLeaveWriteRepository>();
            services.AddScoped<IDepartmentReadRepository, DepartmentReadRepository>();
            services.AddScoped<IDepartmentWriteRepository, DepartmentWriteRepository>();
            services.AddScoped<IEntryReadRepository, EntryReadRepository>();
            services.AddScoped<IEntryWriteRepository, EntryWriteRepository>();
            services.AddScoped<ILateArrivalReadRepository, LateArrivalReadRepository>();
            services.AddScoped<ILateArrivalWriteRepository, LateArrivalWriteRepository>();
            services.AddScoped<IPersonelReadRepository, PersonelReadRepository>();
            services.AddScoped<IPersonelWriteRepository, PersonelWriteRepository>();
            services.AddScoped<IProjectReadRepository, ProjectReadRepository>();
            services.AddScoped<IProjectWriteRepository, ProjectWriteRepository>();
            services.AddScoped<ISalaryReadRepository, SalaryReadRepository>();
            services.AddScoped<ISalaryWriteRepository, SalaryWriteRepository>();
            services.AddScoped<ITeamReadRepository, TeamReadRepository>();
            services.AddScoped<ITeamWriteRepository,TeamWriteRepository>();
            services.AddScoped<IUserReadRepository,UserReadRepository>();
            services.AddScoped<IUserWriteRepository,UserWriteRepository>();
        }
    }
}
