using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DA.Models.DTOs {
    public class ParticipantDTO {
        public int Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string CompanyName { get; set; }
        public string ContactPerson { get; set; }
        public string CompanyEmail { get; set; }
    }
}
