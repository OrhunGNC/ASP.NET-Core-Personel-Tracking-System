using personelTrackingSystem.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Domain.Entities
{
    public class ProjectEntity : BaseEntity
    {
        public string ProjectName { get; set; }
        public DateTime ProjectStart { get; set; }
        public DateTime? ProjectEnd { get; set; }
        public int PersonelId { get; set; }
        public PersonelEntity Personel { get; set; }
        public string ProjectStatus { get; set; }
    }
}
