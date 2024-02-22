using personelTrackingSystem.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Domain.Entities
{
    public class TeamEntity : BaseEntity
    {
        public string TeamName { get; set; }
        public DateTime CreationDate {  get; set; }
        public string TeamStatus { get; set; }
        public string Description { get; set; }
        public string PriorityLevel { get; set; }
        public decimal TeamBudget { get; set; }
    }
}
