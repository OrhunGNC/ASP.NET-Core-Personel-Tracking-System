using personelTrackingSystem.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Domain.Entities
{
    public class EntryEntity : BaseEntity
    {
        public int PersonelId { get; set; }
        public PersonelEntity Personel { get; set; }
        public DateTime? EntryDate { get; set; }
        public DateTime? ExitDate { get; set; }
        public string Status { get; set; }
    }
}
