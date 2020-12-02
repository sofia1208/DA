using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Schulungskalender.Models {
    public class SchoolingRessource {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public int AddressId { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int OrganizerId { get; set; }
        public int Places { get; set; }
        public double Price { get; set; }
        public bool Display { get; set; }
    }
}
