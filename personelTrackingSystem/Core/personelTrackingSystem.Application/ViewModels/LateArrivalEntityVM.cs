using personelTrackingSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Application.ViewModels
{
    public class LateArrivalEntityVM
    {
        [Key]
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public int PersonelID { get; set; }
        public DateTime LateArrivalDate { get; set; }
        public string LateArrivalTime { get; set; }
        public string Reason { get; set; }
        public string ApprovalStatus { get; set; }
        public string? Notes { get; set; }

    }
}
