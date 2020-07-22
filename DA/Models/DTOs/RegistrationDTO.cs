using DA.Models.DTOs;
using Schulungskalender.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DA.Models {
    public class RegistrationDTO {
        public int SchoolingId { get; set; }
        public string Company { get; set; }
        public string Phone { get; set; }
        public string CompanyEmail { get; set; }
        public string Street { get; set; }
        public int StreetNumber { get; set; }
        public int ZipCode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public List<ParticipantDTO> Participants { get; set; }


    }
}
