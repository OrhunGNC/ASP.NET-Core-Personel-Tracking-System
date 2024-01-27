using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Application.ViewModels
{
    public class PersonelEntityVM
    {
        [Key]
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public string NameSurname { get; set; }
        public string Phone { get; set; }
        public int DepartmentId { get; set; }
        public int TeamId { get; set; }


    }
}
