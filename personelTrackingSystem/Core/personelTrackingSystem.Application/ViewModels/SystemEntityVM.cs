using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Application.ViewModels
{
    public class SystemEntityVM
    {
        [Key]
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public string AboutUs { get; set; }
        public string Communication { get; set; }
        public string ApplicationName { get; set; }
    }
}
