﻿using DA.Models;
using DA.Models.DTOs;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Schulungskalender.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DA {
    public class RessourceDtoConverter {


        public SchoolingSummaryDTO GetSchoolingSummaryDTO(SchoolingRessource schooling,CategoryRessource category, AddressRessource address, OrganizerRessource organizer, bool isFree) {
            if (address == null) {
                if (organizer == null) {
                    return new SchoolingSummaryDTO() { Id = schooling.Id, Name = category.Name, IsFree = isFree, Start = schooling.Start.ToString("yyyy-MM-ddThh:mm:ss"), End = schooling.End.ToString("yyyy-MM-ddThh:mm:ss"), Price = schooling.Price };

                }
                else {
                    return new SchoolingSummaryDTO() { Id = schooling.Id, Name = category.Name, IsFree = isFree, Start = schooling.Start.ToString("yyyy-MM-ddThh:mm:ss"), End = schooling.End.ToString("yyyy-MM-ddThh:mm:ss"), Organizer = organizer.Name, Price = schooling.Price };

                }
            }
            else {
                if (organizer == null) {
                    return new SchoolingSummaryDTO() { Id = schooling.Id, Name = category.Name, IsFree = isFree, Start = schooling.Start.ToString("yyyy-MM-ddThh:mm:ss"), End = schooling.End.ToString("yyyy-MM-ddThh:mm:ss"), Price = schooling.Price };

                }
                else {
                    return new SchoolingSummaryDTO() { Id = schooling.Id, Name = category.Name, IsFree = isFree, Start = schooling.Start.ToString("yyyy-MM-ddThh:mm:ss"), End = schooling.End.ToString("yyyy-MM-ddThh:mm:ss"), Organizer = organizer.Name, Address = address.ToString(), Price = schooling.Price };
                }
            }
        }

        public SchoolingDetailDTO GetSchoolingDetailDTO(SchoolingRessource schooling, CategoryRessource category, AddressRessource address, OrganizerRessource organizer, bool isFree, int freePlaces) {
            if (address == null) {
                if (organizer == null) {
                    return new SchoolingDetailDTO() { Id = schooling.Id, End = schooling.End, Start = schooling.Start, Price = schooling.Price, IsFree = isFree, FreePlaces = freePlaces, ContentLink = category.ContentLink, kurzbechreibung = category.ShortDescription, maxPlaces = schooling.Places.ToString() };
                }
                else {
                    return new SchoolingDetailDTO() { Id = schooling.Id, Email = organizer.Email, Organizer = organizer.Name, Phone = organizer.Phone, End = schooling.End, Start = schooling.Start, Price = schooling.Price, ContactPerson = organizer.ContactPerson, IsFree = isFree, FreePlaces = freePlaces, ContentLink = category.ContentLink, kurzbechreibung = category.ShortDescription, maxPlaces = schooling.Places.ToString() };
                }
            }
            else {
                if (organizer == null) {
                    return new SchoolingDetailDTO() { Id = schooling.Id, City = address.City, End = schooling.End, Start = schooling.Start, Price = schooling.Price, Street = address.Street, StreetNumber = address.StreetNumber, ZipCode = address.ZipCode, Country = address.Country, IsFree = isFree, FreePlaces = freePlaces, ContentLink = category.ContentLink, kurzbechreibung = category.ShortDescription, maxPlaces = schooling.Places.ToString() };
                }
                else {
                    return new SchoolingDetailDTO() { Id = schooling.Id, City = address.City, Email = organizer.Email, Organizer = organizer.Name, Phone = organizer.Phone, End = schooling.End, Start = schooling.Start, Price = schooling.Price, Street = address.Street, StreetNumber = address.StreetNumber, ZipCode = address.ZipCode, Country = address.Country, ContactPerson = organizer.ContactPerson, IsFree = isFree, FreePlaces = freePlaces, ContentLink = category.ContentLink, kurzbechreibung = category.ShortDescription, maxPlaces = schooling.Places.ToString() };
                }
            }
        }

        internal BackendSummaryDTO getBackendSummaryDTO(SchoolingRessource schooling, CategoryRessource category) {
            return new BackendSummaryDTO() { Id = schooling.Id, Name = category.Name, Start = schooling.Start, End = schooling.End, Display = schooling.Display };
        }

        internal BackendDetailDTO getbackendDetaiDTO(SchoolingRessource schooling, CategoryRessource category, AddressRessource address, OrganizerRessource organizer, List<ParticipantDTO> participants, bool isFree) {
            return new BackendDetailDTO() { Id = schooling.Id, Name = category.Name, website = organizer.Website, Start = schooling.Start, End = schooling.End, Price = schooling.Price, ZipCode = address.ZipCode, City = address.City, Street = address.Street, StreetNumber = address.StreetNumber, Country = address.Country, Organizer = organizer.Name, ContactPerson = organizer.ContactPerson, Email = organizer.Email, Phone = organizer.Phone, IsFree = isFree, participants = participants, availablePlaces = schooling.Places, ContentLink=category.ContentLink, Kurzbeschreibung=category.ShortDescription, maxPlaces = schooling.Places.ToString() };
        }

        
    }
}


