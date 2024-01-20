using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Domain.Entities
{
    public class PersonelEntity
    {
        [Key]
        public int PersonelId { get; set; }
        public string NameSurname {  get; set; }
        public string Phone { get; set; }
        public int DepartmentId { get; set; }
        public DepartmentEntity Department { get; set; }
        public int TeamId { get; set; }
        public TeamEntity Team { get; set; }
        public ICollection<EntryEntity> EntryEntities { get; set; } 
        public ICollection<ProjectEntity> ProjectEntities { get; set; }
        public ICollection<SalaryEntity> SalaryEntities { get; set;}
        public ICollection<AnnualLeaveEntity> AnnualLeave { get; set;}
        public ICollection<LateArrivalEntity> LateArrival { get; set;}
        

    }
}
