using DA.Models;
using DbLib;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Schulungskalender.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DA {
    public class RessourceDtoConverter {

        public SchoolingSummaryDTO GetSchoolingSummaryDTO(SchoolingRessource schooling, bool isFree) {
            return new SchoolingSummaryDTO() { Id = schooling.Id, Name = schooling.Name, IsFree = isFree, Start = schooling.Start, End = schooling.End };
        }

        public SchoolingDetailDTO GetSchoolingDetailDTO(SchoolingRessource schooling, AddressRessource address, OrganizerRessource organizer, bool isFree) {
            return new SchoolingDetailDTO() { Id = schooling.Id, City = address.City, Email = organizer.Email, Organizer = organizer.Name, Phone = organizer.Phone, End = schooling.End, Start = schooling.Start, Price = schooling.Price, Street = address.Street, StreetNumber = address.StreetNumber, ZipCode = address.ZipCode, Country = address.Country, ContactPerson = organizer.ContactPerson ,IsFree = isFree };
        }


    }
}


