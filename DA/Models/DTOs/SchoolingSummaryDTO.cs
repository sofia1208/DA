using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DA.Models {
    public class SchoolingSummaryDTO {
        public int Id { get; set; }
        public string Address { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
        public string Name { get; set; }
        public string Organizer { get; set; }
        public double Price { get; set; }
        public bool IsFree { get; set; }
    }
}
