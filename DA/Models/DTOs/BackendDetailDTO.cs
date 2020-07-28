using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DA.Models.DTOs {
    public class BackendDetailDTO {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public double Price { get; set; }
        public int ZipCode { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public int StreetNumber { get; set; }
        public string Country { get; set; }
        public string Organizer { get; set; }
        public string ContactPerson { get; set; }
        public string Email { get; set; }
        public string website { get; set; }
        public string Phone { get; set; }
        public bool IsFree { get; set; }
        public List<ParticipantDTO> participants { get; set; }
        public int availablePlaces { get; set; }
    }
}
