using personelTrackingSystem.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Domain.Entities
{
    public class LateArrivalEntity : BaseEntity
    {
        public int PersonelID { get; set; }
        public PersonelEntity Personel { get; set; }
        public DateTime LateArrivalDate {  get; set; }
        public string LateArrivalTime { get; set; }
        public string Reason { get; set; }
        public string ApprovalStatus { get; set; }
        public string? Notes { get; set; }
    }
}
