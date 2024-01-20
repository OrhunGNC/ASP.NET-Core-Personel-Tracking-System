using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Domain.Entities
{
    public class TeamEntity
    {
        [Key]
        public int TeamId { get; set; }
        public string TeamName { get; set; }
        public DateTime CreationDate {  get; set; }
        public ICollection<PersonelEntity> PersonelEntities { get; set; }
        public string TeamStatus { get; set; }
        public string Description { get; set; }
        public string PriorityLevel { get; set; }
        public decimal TeamBudget { get; set; }
    }
}
