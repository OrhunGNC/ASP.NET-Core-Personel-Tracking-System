using personelTrackingSystem.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Domain.Entities
{
    public class SalaryEntity : BaseEntity
    {
        public int PersonelId { get; set; }
        public PersonelEntity Personel { get; set; }
        public decimal PersonelSalary { get; set; }
        public DateTime SalaryDate { get; set; }
        public int IncreaseRate { get; set; }

    }
}
