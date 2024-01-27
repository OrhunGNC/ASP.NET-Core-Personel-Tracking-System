using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Application.ViewModels
{
    public class TeamEntityVM
    {
        [Key]
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public string TeamName { get; set; }
        public DateTime CreationDate { get; set; }
        public string TeamStatus { get; set; }
        public string Description { get; set; }
        public string PriorityLevel { get; set; }
        public decimal TeamBudget { get; set; }
    }
}
