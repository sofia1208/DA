using DA.Models;
using Schulungskalender.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.SqlClient;
using System.Net.Mail;
using DA;
using DbLib;
using MySql.Data.Entity;
using System.Data;
using MySql.Data.MySqlClient;
using System.Text;

namespace Schulungskalender.Services {
    public class SchoolingService {
        private List<AddressRessource> addresses;
        private List<CompanyRessource> companies;
        private List<OrganizerRessource> organizers;
        private List<PersonRessource> persons;
        private List<RegistrationRessource> registrations;
        private List<SchoolingRessource> schoolings;
       

        DataTable dataTable = new DataTable();
        public SchoolingService() {
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

            addresses = new List<AddressRessource>();
            companies = new List<CompanyRessource>();
            organizers = new List<OrganizerRessource>();
            persons = new List<PersonRessource>();
            registrations = new List<RegistrationRessource>();
            schoolings = new List<SchoolingRessource>();

            fillLists();
        }

        public List<SchoolingSummaryDTO> Summary(string type) {
            return null;
        }

        public List<SchoolingSummaryDTO> Summary() { 
            return null;
        }

        public SchoolingDetailDTO GetDetails(int id) {
            //var mail = new MailMaker() {
            //    Absender = "isi.gaubinger@gmail.com",
            //    Empfänger = new List<string>() { "isabelle.arthofer@gmail.com" },
            //    Betreff = "Test",
            //    Nachricht = "Testmail",
            //    Servername = "smtp.web.de",
            //    Port = "25"
            //};

            //mail.Send();

            //SchoolingContext db = new SchoolingContext();
            //int length = db.Addresses.Count();
            //Console.WriteLine(length);

            return new SchoolingDetailDTO() {Id = id, City = "Wels", Email = "mail@test.com", End = DateTime.Now, Start = DateTime.Now.AddDays(-1), Organizer = "MoveIT, trainings@moveit.at", Phone = "+43 1234 56789", Price = 285, Street = "Durisolstraße 7" };
        }

        public RegistrationDTO Register(RegistrationDTO registration) {
            return registration;
        }

        private void fillLists() {
            var con = "Server=10.90.90.222;Database=educationPlanner;Uid=ep;Pwd=eDpL2%0!;persistsecurityinfo=True";
            var db = new MySqlConnection(con);
            db.Open();

            var getAddressesCmd = new MySqlCommand("SELECT * FROM addresses", db);

            AddressRessource address;
            using (MySqlDataReader reader = getAddressesCmd.ExecuteReader()) {
                while (reader.Read()) {
                    address = new AddressRessource() { Id = reader.GetInt32(0), Street = reader.GetString(1), StreetNumber = reader.GetInt32(2), ZipCode = reader.GetInt32(3), City = reader.GetString(4), Country = reader.GetString(5) };
                    addresses.Add(address);
                }
            }

            var getCompaniesCmd = new MySqlCommand("SELECT * FROM companies", db);

            CompanyRessource company;
            using (MySqlDataReader reader = getCompaniesCmd.ExecuteReader()) {
                while (reader.Read()) {
                    company = new CompanyRessource() { Id = reader.GetInt32(0), Name = reader.GetString(1), Phone = reader.GetString(2), Email = reader.GetString(3), AddressId = reader.GetInt32(4) };
                    companies.Add(company);
                }
            }

            var getOrganizersCmd = new MySqlCommand("SELECT * FROM organizers", db);

            OrganizerRessource organizer;
            using (MySqlDataReader reader = getOrganizersCmd.ExecuteReader()) {
                while (reader.Read()) {
                    organizer = new OrganizerRessource() { Id = reader.GetInt32(0), Name = reader.GetString(1), ContactPerson = reader.GetString(2), Email = reader.GetString(3), Website = reader.GetString(4), Phone = reader.GetString(5) };
                    organizers.Add(organizer);
                }
            }

            var getPersonsCmd = new MySqlCommand("SELECT * FROM persons", db);

            PersonRessource person;
            using (MySqlDataReader reader = getPersonsCmd.ExecuteReader()) {
                while (reader.Read()) {
                    person = new PersonRessource() { Id = reader.GetInt32(0), Firstname = reader.GetString(1), Lastname = reader.GetString(2), Email = reader.GetString(3), CompanyId = reader.GetInt32(4) };
                    persons.Add(person);
                }
            }

            var getSchoolingsCmd = new MySqlCommand("SELECT * FROM schoolings", db);

            SchoolingRessource schooling;
            using (MySqlDataReader reader = getSchoolingsCmd.ExecuteReader()) {
                while (reader.Read()) {
                    bool reservation = (reader.GetInt32(5) == 1) ? true : false;
                    schooling = new SchoolingRessource() { Id = reader.GetInt32(0), Name = reader.GetString(1), AddressId = reader.GetInt32(2), Start = reader.GetDateTime(3), End = reader.GetDateTime(4), Reservation = reservation, ReservationDate = reader.GetDateTime(6), OrganizerId = reader.GetInt32(7), Places = reader.GetInt32(8) };
                    schoolings.Add(schooling);
                }
            }

            var getRegistrationCmd = new MySqlCommand("SELECT * FROM registrations", db);

            RegistrationRessource registration;
            using (MySqlDataReader reader = getRegistrationCmd.ExecuteReader()) {
                while (reader.Read()) {
                    registration = new RegistrationRessource() { SchoolingId = reader.GetInt32(0), PersonId = reader.GetInt32(1) };
                    registrations.Add(registration);
                }
            }
        }

        private bool IsSchoolingFree(int id) {
            return (schoolings.Find(x => x.Id == id).Places - registrations.Where(x => x.SchoolingId == id).Count() > 0) ? true : false;
        }
    }
}
