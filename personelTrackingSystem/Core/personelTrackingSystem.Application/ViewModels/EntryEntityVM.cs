using personelTrackingSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Application.ViewModels
{
    public class EntryEntityVM
    {
        [Key]
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public int PersonelId { get; set; }
        public DateTime? EntryDate { get; set; }
        public DateTime? ExitDate { get; set; }
        public string Status { get; set; }

    }
}
