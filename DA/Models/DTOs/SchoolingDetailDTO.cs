using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Schulungskalender.Models {
    public class SchoolingDetailDTO {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int ZipCode { get; set; }
        public string City { get; set; }
        public int StreetNumber { get; set; }
        public string Country { get; set; }
        public string Street { get; set; }
        public string Organizer { get; set; }
        public double Price { get; set; }
        public bool IsFree { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string ContactPerson { get; set; }
        public int FreePlaces { get; set; }
        public string kurzbechreibung { get; set; }
        public string ContentLink { get; set; }
        public string maxPlaces { get; set; }

        public override string ToString() {
            return $"{Name} {Start} {End} {Street} {StreetNumber} {ZipCode} {City} {Country} {Phone} {Email} {ContactPerson} {ContentLink}";
        }
    }
}
