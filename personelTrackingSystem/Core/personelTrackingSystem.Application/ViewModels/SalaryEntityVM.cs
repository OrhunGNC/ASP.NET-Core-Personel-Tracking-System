using personelTrackingSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Application.ViewModels
{
    public class SalaryEntityVM
    {
        [Key]
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public int PersonelId { get; set; }
        public decimal PersonelSalary { get; set; }
        public DateTime SalaryDate { get; set; }
        public int IncreaseRate { get; set; }

    }
}
