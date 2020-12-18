using DA.Models;
using Schulungskalender.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using DA;
using System.Data;
using MySql.Data.MySqlClient;
using System.Text;
using System.Net;
using System.Diagnostics;
using DA.Models.DTOs;

namespace Schulungskalender.Services {
    public class SchoolingService {
        private readonly RessourceDtoConverter converter;
        private readonly MailMaker mailMaker;
        private readonly Database db;

        private List<AddressRessource> addresses;
        private List<CompanyRessource> companies;
        private List<OrganizerRessource> organizers;
        private List<PersonRessource> persons;
        private List<RegistrationRessource> registrations;
        private List<SchoolingRessource> schoolings;
        private List<CategoryRessource> categories;


        public SchoolingService() {
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
            converter = new RessourceDtoConverter();
            mailMaker = new MailMaker();
            db = new Database();

            FillLists();
        }

        public List<SchoolingSummaryDTO> Summary(string type) {

            if (type.ToLower().Equals("isfree")) {
                return schoolings.Select(x => {
                    var address = addresses.Find(y => y.Id == x.AddressId);
                    var organizer = organizers.Find(y => y.Id == x.OrganizerId);
                    var category = categories.Find(y => y.Id == x.CategoryId);

                    return converter.GetSchoolingSummaryDTO(x, category, address, organizer, IsSchoolingFree(x.Id));

                })
                .Where(x => x.IsFree).ToList();
            }
            return schoolings.Select(x => {
                var address = addresses.Find(y => y.Id == x.AddressId);
                var organizer = organizers.Find(y => y.Id == x.OrganizerId);
                var category = categories.Find(y => y.Id == x.CategoryId);

                return converter.GetSchoolingSummaryDTO(x, category, address, organizer, IsSchoolingFree(x.Id));

            })
                .Where(x => x.Name.Split('+')[1].Trim().ToLower().Equals(type)).OrderBy(x => x.Start).ToList();
        }

        public List<SchoolingSummaryDTO> Summary() {
            var scho = schoolings.Select(x => {
                var address = addresses.Find(y => y.Id == x.AddressId);
                var organizer = organizers.Find(y => y.Id == x.OrganizerId);
                var category = categories.Find(y => y.Id == x.CategoryId);

                return converter.GetSchoolingSummaryDTO(x, category, address, organizer, IsSchoolingFree(x.Id));

            })
                .ToList();
            return scho;
        }

        public SchoolingDetailDTO GetDetails(int id) {
            
            var schooling = schoolings.Find(x => x.Id == id);
            var address = addresses.Find(x => x.Id == schooling.AddressId);
            var organizer = organizers.Find(x => x.Id == schooling.OrganizerId);
            var category = categories.Find(y => y.Id == schooling.CategoryId);

            return converter.GetSchoolingDetailDTO(schooling,category, address, organizer, IsSchoolingFree(id), getFreePlaces(id));
        }


        public RegistrationDTO Register(RegistrationDTO registration) {
            bool isRegistrationSuccessful = true;

            if (FindAddress(registration) == null) {
                isRegistrationSuccessful = db.InsertAddress(registration);
                db.GetAddresses(ref addresses);
            }
            var address = FindAddress(registration);

            if (FindCompany(registration, address.Id) == null) {
                isRegistrationSuccessful = db.InsertCompany(registration, address.Id);
                db.GetCompanies(ref companies);
            }
            var company = FindCompany(registration, address.Id);

            foreach (var person in registration.Participants) {
                if (FindPerson(person.Firstname, person.Lastname, person.Email, company.Id) == null) {
                    isRegistrationSuccessful = db.InsertPerson(person, company.Id);
                }
            }

            db.GetPersons(ref persons);

            foreach (var person in registration.Participants) {
                var personRessource = FindPerson(person.Firstname, person.Lastname, person.Email, company.Id);
                isRegistrationSuccessful = db.InsertRegistration(registration.SchoolingId, personRessource.Id);
            }

            db.GetRegistrations(ref registrations);

            if (isRegistrationSuccessful) {
                var schooling = schoolings.Find(x => x.Id == registration.SchoolingId);
                var category = categories.Find(y => y.Id == schooling.CategoryId);
                mailMaker.sendMail("isabelle.arthofer@gmail.com"/*company.Email*/, company.ContactPerson, category.Name, schooling.Start, registration.Participants);
            }

            return registration;
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

        private int getFreePlaces(int id) {
           return schoolings.Find(x => x.Id == id).Places - registrations.Where(x => x.SchoolingId == id).Count();
        }

        private AddressRessource FindAddress(RegistrationDTO registration) {
            return addresses.Find(x => x.ZipCode == registration.ZipCode && x.Street == registration.Street && x.StreetNumber == registration.StreetNumber && x.City == registration.City && x.Country == registration.Country);
        }

        private CompanyRessource FindCompany(RegistrationDTO registration, int addressId) {
            return companies.Find(x => x.Email == registration.CompanyEmail && x.Name == registration.Company && x.Phone == registration.Phone && x.AddressId == addressId);
        }

        private PersonRessource FindPerson(string firstname, string lastname, string email, int company_id) {
            return persons.Find(x => x.Firstname == firstname && x.Lastname == lastname && x.Email == email && x.CompanyId == company_id);
        }

        public bool UpdateDisplay(int id, bool isDisplayed) {
            var schooling = schoolings.Find(x => x.Id == id);
            db.UpdateSchooling(id, isDisplayed);
            db.GetSchoolings(ref schoolings);

            return true;
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



