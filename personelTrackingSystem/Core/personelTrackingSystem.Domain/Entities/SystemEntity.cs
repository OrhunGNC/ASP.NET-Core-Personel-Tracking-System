using personelTrackingSystem.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Domain.Entities
{
    public class SystemEntity : BaseEntity
    {
        public string AboutUs { get; set; }
        public string Communication { get; set; }
        public string ApplicationName { get; set; }
    }
}
