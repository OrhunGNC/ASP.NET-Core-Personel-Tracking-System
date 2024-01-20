using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace personelTrackingSystem.Domain.Entities
{
    public class AnnualLeaveEntity
    {
        [Key]
        public int LeaveId {  get; set; }
        public int PersonelId {  get; set; }
        public PersonelEntity Personel {  get; set; }
        public DateTime LeaveStartDate {  get; set; }
        public DateTime LeaveEndDate { get; set;}
        public string ApprovalStatus { get; set; }
        public DateTime LeaveApplicationDate { get; set; }
    }
}
