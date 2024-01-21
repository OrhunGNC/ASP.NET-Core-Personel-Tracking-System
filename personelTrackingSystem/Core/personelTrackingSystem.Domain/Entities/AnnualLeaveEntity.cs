using personelTrackingSystem.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Domain.Entities
{
    public class AnnualLeaveEntity :BaseEntity
    {
        public int PersonelId {  get; set; }
        public PersonelEntity Personel {  get; set; }
        public DateTime LeaveStartDate {  get; set; }
        public DateTime LeaveEndDate { get; set;}
        public string ApprovalStatus { get; set; }
        public DateTime LeaveApplicationDate { get; set; }
    }
}
