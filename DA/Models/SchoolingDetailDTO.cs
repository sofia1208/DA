﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Schulungskalender.Models {
    public class SchoolingDetailDTO {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int Price { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string Organizer { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
    }
}