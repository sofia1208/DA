using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Schulungskalender.Models {
    public class SchoolingDTO {
        public int Id { get; set; }
        public string Name { get; set; }
        public int AddressId { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool Reservation { get; set; }
        public DateTime ReservationDate { get; set; }
        public int OrganizerId { get; set; }
        public int Places { get; set; }
    }
}
