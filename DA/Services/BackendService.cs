﻿using DA.Models.DTOs;
using Org.BouncyCastle.Asn1.Icao;
using Schulungskalender.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DA.Services {
    public class BackendService {
        private readonly Database db;
        private readonly MailMaker mailMaker;
        private readonly RessourceDtoConverter converter;

        private List<AddressRessource> addresses;
        private List<CompanyRessource> companies;
        private List<OrganizerRessource> organizers;
        private List<PersonRessource> persons;
        private List<RegistrationRessource> registrations;
        private List<SchoolingRessource> schoolings;
        private List<CategoryRessource> categories;

        public BackendService() {
            db = new Database();
            mailMaker = new MailMaker();
            converter = new RessourceDtoConverter();

            FillLists();
        }

        internal bool Login(LoginUser user) {
            if (user.username.Equals("Schulung") && user.password.Equals("moveIT%99")) {
                return true;
            }
            return false;
        }


        public List<BackendSummaryDTO> GetSchoolings() {
            return schoolings.Select(x => converter.getBackendSummaryDTO(x))
                .OrderBy(x => x.Start)
                .ToList();
        }

        internal List<CategoryDto> GetCategories() {
            return categories.Select(x => new CategoryDto() { Id = x.Id, Name = x.Name, ShortDescription = x.ShortDescription, ContentLink = x.ContentLink })
                .ToList();
        }

        public bool DeleteSchooling(int id) {
            var wasSuccessful = db.deleteSchooling(id);
            db.RemoveAllForId(id);
            db.GetSchoolings(ref schoolings);
            db.GetRegistrations(ref registrations);
            return wasSuccessful;
        }

        public bool UpdateDisplay(int id, bool isDisplayed) {
            var schooling = schoolings.Find(x => x.Id == id);
            db.UpdateSchooling(id, isDisplayed);
            db.GetSchoolings(ref schoolings);

            return true;
        }



        public BackendDetailDTO GetSchoolings(int id) {
            var schooling = schoolings.Find(x => x.Id == id);
            var address = FindAddress(schooling);
            var organizer = FindOrganizer(schooling);
            var participants = GetParticipants(id);
            var isFree = IsSchoolingFree(id);
            return converter.getbackendDetaiDTO(schooling, address, organizer, participants, isFree);
        }



        public bool InsertSchooling(BackendDetailDTO schooling) {
            var wasSuccessful = true;
            AddressRessource address = null;
            if (schooling.Street != null && schooling.City != null && schooling.Country != null) {
                address = FindAddress(schooling);
                if (address == null) {
                    wasSuccessful = db.InsertAddress(schooling);
                    db.GetAddresses(ref addresses);
                    address = FindAddress(schooling);
                }
            }

            OrganizerRessource organizer = null;
            if (schooling.Organizer != null) {
                organizer = FindOrganizer(schooling);
                if (organizer == null && wasSuccessful) {
                    wasSuccessful = db.InsertOrganizer(schooling);
                    db.GetOrganizers(ref organizers);
                    organizer = FindOrganizer(schooling);
                }
            }


            if (wasSuccessful) {
                schooling.participants.ForEach(x => {
                    if (FindCompany(x) == null) {
                        wasSuccessful = db.InsertCompany(x);
                    }
                    db.GetCompanies(ref companies);
                    var company = FindCompany(x);
                    if (wasSuccessful && FindPerson(x) == null) {
                        wasSuccessful = db.InsertPerson(x, company);
                    }
                });
                db.GetPersons(ref persons);

                wasSuccessful = db.InsertSchooling(schooling, (address == null) ? 0 : address.Id, (organizer == null) ? 0 : organizer.Id);

                db.GetSchoolings(ref schoolings);

                var sRessource = FindSchooling(schooling);

                schooling.participants.ForEach(x => {
                    var person = FindPerson(x);
                    if (!doesRegistrationExist(sRessource.Id, person.Id)) {
                        wasSuccessful = db.InsertRegistration(sRessource.Id, person.Id);
                    }

                });
            }

            return wasSuccessful;
        }

        public bool EditSchooling(int id, BackendDetailDTO schooling) {
            var wasSuccessful = true;
            AddressRessource address = null;
            if (schooling.Street != null && schooling.City != null && schooling.Country != null) {
                address = FindAddress(schooling);
                if (address == null) {
                    wasSuccessful = db.InsertAddress(schooling);
                    db.GetAddresses(ref addresses);
                    address = FindAddress(schooling);
                }
            }

            OrganizerRessource organizer = null;
            if (schooling.Organizer != null) {
                organizer = FindOrganizer(schooling);
                if (organizer == null && wasSuccessful) {
                    wasSuccessful = db.InsertOrganizer(schooling);
                    db.GetOrganizers(ref organizers);
                    organizer = FindOrganizer(schooling);
                }
            }

            if (wasSuccessful) {
                schooling.participants.ForEach(x => {
                    if (FindCompany(x) == null) {
                        wasSuccessful = db.InsertCompany(x);
                    }
                    db.GetCompanies(ref companies);
                    var company = FindCompany(x);
                    if (wasSuccessful && FindPerson(x) == null) {
                        wasSuccessful = db.InsertPerson(x, company);
                    }
                });
                db.GetPersons(ref persons);

                Console.WriteLine(schooling.End);
                wasSuccessful = db.UpdateSchooling(schooling, (address == null) ? 0 : address.Id, (organizer == null) ? 0 : organizer.Id);

                db.GetSchoolings(ref schoolings);

                var sRessource = FindSchooling(schooling);
                db.RemoveAllForId(sRessource.Id);
                db.GetRegistrations(ref registrations);

                schooling.participants.ForEach(x => {
                    var person = FindPerson(x);
                    if (!doesRegistrationExist(sRessource.Id, person.Id)) {
                        wasSuccessful = db.InsertRegistration(sRessource.Id, person.Id);
                    }
                });
                db.GetRegistrations(ref registrations);
            }
            return wasSuccessful;
        }

        internal List<OrganizerDTO> GetOrganizers() {
            return organizers.Select(x => new OrganizerDTO() { Id = x.Id, Name = x.Name, ContactPerson = x.ContactPerson, Email = x.Email, Website = x.Website, Phone = x.Phone }).ToList();
        }

        internal List<string> GetCompanies() {
            return companies.Select(x => x.Name).ToList();
        }

        private void FillLists() {
            addresses = new List<AddressRessource>();
            companies = new List<CompanyRessource>();
            organizers = new List<OrganizerRessource>();
            persons = new List<PersonRessource>();
            registrations = new List<RegistrationRessource>();
            schoolings = new List<SchoolingRessource>();
            categories = new List<CategoryRessource>();

            db.GetAllTables(ref addresses, ref companies, ref schoolings, ref organizers, ref registrations, ref persons, ref categories);
        }

        private bool IsSchoolingFree(int id) {
            return (schoolings.Find(x => x.Id == id).Places - registrations.Where(x => x.SchoolingId == id).Count() > 0);
        }

        private AddressRessource FindAddress(SchoolingRessource schooling) {
            return addresses.Find(x => x.Id == schooling.AddressId);
        }

        private AddressRessource FindAddress(BackendDetailDTO schooling) {
            return addresses.Find(x => x.Street == schooling.Street && x.StreetNumber == schooling.StreetNumber && x.ZipCode == schooling.ZipCode && x.City == schooling.City && x.Country == schooling.Country);
        }

        private OrganizerRessource FindOrganizer(SchoolingRessource schooling) {
            return organizers.Find(x => x.Id == schooling.OrganizerId);
        }

        private OrganizerRessource FindOrganizer(BackendDetailDTO schooling) {
            return organizers.Find(x => x.Name == schooling.Organizer);
        }

        private PersonRessource FindPerson(ParticipantDTO participant) {
            return persons.Find(x => x.Email == participant.Email && x.Firstname == participant.Firstname && x.Lastname == participant.Lastname);
        }

        private SchoolingRessource FindSchooling(BackendDetailDTO backendDetail) {
            return schoolings.Find(x =>
              x.End.Day == backendDetail.End.Day &&
            x.End.Month == backendDetail.End.Month &&
            x.Name == backendDetail.Name &&
            x.Start.Day == backendDetail.Start.Day &&
            x.Start.Month == backendDetail.Start.Month &&
            x.Price == backendDetail.Price);
        }

        private CompanyRessource FindCompany(ParticipantDTO participant) {
            return companies.Find(x => x.Name == participant.CompanyName);
        }

        private bool doesRegistrationExist(int schoolingId, int personID) {
            return registrations.Find(X => X.SchoolingId == schoolingId && X.PersonId == personID) != null;
        }

        private List<ParticipantDTO> GetParticipants(int id) {
            return registrations.Where(x => x.SchoolingId == id)
                .Select(x => x.PersonId)
                .Distinct()
                .Select(x => {
                    var personRessource = persons.Find(y => y.Id == x);
                    var company = companies.Find(y => y.Id == personRessource.CompanyId);
                    return new ParticipantDTO() { Id = personRessource.Id, Firstname = personRessource.Firstname, Lastname = personRessource.Lastname, Email = personRessource.Email, CompanyName = company.Name, CompanyEmail = company.Email, ContactPerson = company.ContactPerson };
                })
                .ToList();
        }

    }
}
