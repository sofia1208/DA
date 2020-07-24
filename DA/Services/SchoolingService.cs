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


        public SchoolingService() {
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
            converter = new RessourceDtoConverter();
            mailMaker = new MailMaker();
            db = new Database();

            fillLists();
        }

        public List<SchoolingSummaryDTO> Summary(string type) {
            return schoolings.Select(x => {
                var address = addresses.Find(y => y.Id == x.AddressId);
                var organizer = organizers.Find(y => y.Id == x.OrganizerId);

                return converter.GetSchoolingSummaryDTO(x, address, organizer, IsSchoolingFree(x.Id));

            })
                .Where(x => x.Name.Split('+')[1].Trim().ToLower().Equals(type)).ToList();
        }

        public List<SchoolingSummaryDTO> Summary() {
            return schoolings.Select(x => {
                var address = addresses.Find(y => y.Id == x.AddressId);
                var organizer = organizers.Find(y => y.Id == x.OrganizerId);

                return converter.GetSchoolingSummaryDTO(x, address, organizer, IsSchoolingFree(x.Id));

            })
                .ToList();
        }

        public SchoolingDetailDTO GetDetails(int id) {
            var schooling = schoolings.Find(x => x.Id == id);
            var address = addresses.Find(x => x.Id == schooling.AddressId);
            var organizer = organizers.Find(x => x.Id == schooling.OrganizerId);

            return converter.GetSchoolingDetailDTO(schooling, address, organizer, IsSchoolingFree(id));
        }

        public RegistrationDTO Register(RegistrationDTO registration) {
            bool isRegistrationSuccessful = true;

            if (FindAddress(registration) == null) {
                isRegistrationSuccessful = db.InsertAddress(registration);
                db.getAddresses(ref addresses);
            }
            var address = FindAddress(registration);

            if (FindCompany(registration, address.Id) == null) {
                isRegistrationSuccessful = db.InsertCompany(registration, address.Id);
                db.getCompanies(ref companies);
            }
            var company = FindCompany(registration, address.Id);

            foreach (var person in registration.Participants) {
                if (FindPerson(person.Firstname, person.Lastname, person.Email, company.Id) == null) {
                    isRegistrationSuccessful = db.InsertPerson(person, company.Id);
                }
            }

            db.getPersons(ref persons);

            foreach (var person in registration.Participants) {
                var personRessource = FindPerson(person.Firstname, person.Lastname, person.Email, company.Id);
                isRegistrationSuccessful = db.InsertRegistration(registration.SchoolingId, personRessource.Id);
            }

            db.getRegistrations(ref registrations);

            if (isRegistrationSuccessful) {
                //mailMaker.sendMail();
            }

            return registration;
        }

        private void fillLists() {
            addresses = new List<AddressRessource>();
            companies = new List<CompanyRessource>();
            organizers = new List<OrganizerRessource>();
            persons = new List<PersonRessource>();
            registrations = new List<RegistrationRessource>();
            schoolings = new List<SchoolingRessource>();

            db.getAllTables(ref addresses, ref companies, ref schoolings, ref organizers, ref registrations, ref persons);
        }

        private bool IsSchoolingFree(int id) {
            return (schoolings.Find(x => x.Id == id).Places - registrations.Where(x => x.SchoolingId == id).Count() > 0) ? true : false;
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
    }
}
