using Schulungskalender.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DA.Models {
    public class FullRegistrationDTO {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string SchoolingAddress { get; set; }
        public string Company { get; set; }
        public string Phone { get; set; }
        public string CompanyEmail { get; set; }
        public string CompanyAddress { get; set; }
        public List<string> Participants { get; set; }


    }
}
