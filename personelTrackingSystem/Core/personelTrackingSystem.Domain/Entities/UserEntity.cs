using personelTrackingSystem.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Domain.Entities
{
    public class UserEntity : BaseEntity
    {
        public string EMail { get; set; }
        public string Password { get; set; }
        public string NameSurname { get; set; }
        public string Phone { get; set; }
    }
}
