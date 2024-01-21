using Microsoft.EntityFrameworkCore;
using personelTrackingSystem.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Domain.Entities
{
    public class DepartmentEntity:BaseEntity
    {
        public string DepartmentName { get; set; }
        public string DepartmentHead {  get; set; }
        public ICollection<PersonelEntity> Personels { get; set; }
    }
}
