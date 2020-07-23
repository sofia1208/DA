using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DA.Models {
    public class SchoolingSummaryDTO {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsFree { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public double Price { get; set; }
        public string Organizer { get; set; }
        public string City { get; set; }

    }
}
