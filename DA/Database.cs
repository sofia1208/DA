using DA.Models;
using DbLib;
using MySql.Data.MySqlClient;
using Schulungskalender.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Permissions;
using System.Threading.Tasks;

namespace DA {
    public class Database {
        string connectionString;
        MySqlConnection connection;

        public Database() {
            //connectionString = "Server=10.90.90.222;Database=educationPlanner;Uid=ep;Pwd=eDpL2%0!;persistsecurityinfo=True";
            connectionString = "server=wp338.webpack.hosteurope.de;database=db12449415-dpl2020;Uid=db12449415-dpl;Pwd=IsaSof%20;persistsecurityinfo=True";
            connection = new MySqlConnection(connectionString);
            connection.Open();
        }

        public void getAllTables(ref List<AddressRessource> addresses, ref List<CompanyRessource> companies, ref List<SchoolingRessource>schoolings, ref List<OrganizerRessource> organizers, ref List<RegistrationRessource> registrations, ref List<PersonRessource> persons) {
            getAddresses(ref addresses);
            getCompanies(ref companies);
            getOrganizers(ref organizers);
            getPersons(ref persons);
            getSchoolings(ref schoolings);
            getRegistrations(ref registrations);
        }

        public void getAddresses(ref List<AddressRessource> addresses) {

            var getAddressesCmd = new MySqlCommand("SELECT * FROM addresses", connection);

            AddressRessource address;
            using (MySqlDataReader reader = getAddressesCmd.ExecuteReader()) {
                while (reader.Read()) {
                    address = new AddressRessource() { Id = reader.GetInt32(0), Street = reader.GetString(1) ?? "", StreetNumber = reader.GetInt32(2), ZipCode = reader.GetInt32(3), City = reader.GetString(4), Country = reader.GetString(5) };
                    addresses.Add(address);
                }
            }
        }

        public void getCompanies(ref List<CompanyRessource> companies) {

            var getCompaniesCmd = new MySqlCommand("SELECT * FROM companies", connection);

            CompanyRessource company;
            using (MySqlDataReader reader = getCompaniesCmd.ExecuteReader()) {
                while (reader.Read()) {
                    company = new CompanyRessource() { Id = reader.GetInt32(0), Name = reader.GetString(1), Phone = reader.GetString(2), Email = reader.GetString(3), AddressId = reader.GetInt32(4) };
                    companies.Add(company);
                }
            }
        }

        public void getOrganizers(ref List<OrganizerRessource> organizers) {
            var getOrganizersCmd = new MySqlCommand("SELECT * FROM organizers", connection);

            OrganizerRessource organizer;
            using (MySqlDataReader reader = getOrganizersCmd.ExecuteReader()) {
                while (reader.Read()) {
                    organizer = new OrganizerRessource() { Id = reader.GetInt32(0), Name = reader.GetString(1), ContactPerson = reader.GetString(2), Email = reader.GetString(3), Website = reader.GetString(4), Phone = reader.GetString(5) };
                    organizers.Add(organizer);
                }
            }
        }

        public void getPersons(ref List<PersonRessource> persons) {
            var getPersonsCmd = new MySqlCommand("SELECT * FROM persons", connection);

            PersonRessource person;
            using (MySqlDataReader reader = getPersonsCmd.ExecuteReader()) {
                while (reader.Read()) {
                    person = new PersonRessource() { Id = reader.GetInt32(0), Firstname = reader.GetString(1), Lastname = reader.GetString(2), Email = reader.GetString(3), CompanyId = reader.GetInt32(4) };
                    persons.Add(person);
                }
            }
        }

        public void getSchoolings(ref List<SchoolingRessource> schoolings) {
            var getSchoolingsCmd = new MySqlCommand("SELECT * FROM schoolings", connection);

            SchoolingRessource schooling;
            using (MySqlDataReader reader = getSchoolingsCmd.ExecuteReader()) {
                while (reader.Read()) {
                    bool reservation = (reader.GetInt32(5) == 1) ? true : false;
                    schooling = new SchoolingRessource() { Id = reader.GetInt32(0), Name = reader.GetString(1), AddressId = reader.GetInt32(2), Start = reader.GetDateTime(3), End = reader.GetDateTime(4), Price = reader.GetDouble(5), Reservation = reservation, ReservationDate = reader.GetDateTime(7) , OrganizerId = reader.GetInt32(8), Places = reader.GetInt32(9) };
                    schoolings.Add(schooling);
                }
            }
        }

        public void getRegistrations(ref List<RegistrationRessource> registrations) {
            registrations = new List<RegistrationRessource>();

            var getRegistrationCmd = new MySqlCommand("SELECT * FROM registrations", connection);

            RegistrationRessource registration;
            using (MySqlDataReader reader = getRegistrationCmd.ExecuteReader()) {
                while (reader.Read()) {
                    registration = new RegistrationRessource() { SchoolingId = reader.GetInt32(0), PersonId = reader.GetInt32(1) };
                    registrations.Add(registration);
                }
            }
        }

        public bool InsertAddress(RegistrationDTO registrationDTO) {
            try {
                string insertstatement = $"Insert into addresses (street, street_number, city, zip_code, country) Values ({registrationDTO.Street}, {registrationDTO.StreetNumber}, {registrationDTO.City}, {registrationDTO.ZipCode}, {registrationDTO.Country}";
                var insertAddressCmd = new MySqlCommand(insertstatement, connection);
                insertAddressCmd.ExecuteNonQuery();
            }
            catch (Exception) {
                return false;
            }
            finally {
                if (connection != null)
                    connection.Close();
            }

            return true;

        }

        public bool InsertCompany(RegistrationDTO registrationDTO, int address_id) {
            try {
                string insertstatement = $"Insert into companies (name, email, phone, address_id) Values ({registrationDTO.Company}, {registrationDTO.CompanyEmail}, {registrationDTO.Phone}, {address_id}";
                var insertCompanyCmd = new MySqlCommand(insertstatement, connection);
                insertCompanyCmd.ExecuteNonQuery();
            }
            catch (Exception) {
                return false;
            }
            finally {
                if (connection != null)
                    connection.Close();
            }

            return true;

        }

        public bool InsertPerson(string[] split, int company_id) {
            try {
                string insertstatement = $"Insert into persons (firstname, lastname, email, company_id) Values ({split[0]}, {split[1]}, {split[2]}, {company_id}";
                var insertPersonCmd = new MySqlCommand(insertstatement, connection);
                insertPersonCmd.ExecuteNonQuery();
            }
            catch (Exception) {
                return false;
            }
            finally {
                if (connection != null)
                    connection.Close();
            }

            return true;
        }

        public bool InsertRegistration(int schooling_id, int person_id) {
            try {
                string insertstatement = $"Insert into registrations (schooling_id, person_id) Values ({schooling_id}, {person_id}";
                var insertRegistrationCmd = new MySqlCommand(insertstatement, connection);
                insertRegistrationCmd.ExecuteNonQuery();
            }
            catch (Exception) {
                return false;
            }

            finally {
                if (connection != null)
                    connection.Close();
            }

            return true;
        }

        //public CompanyRessource InsertCompanyRessource(RegistrationDTO registrationDTO) {
        //    string insertStatement = $"Insert into companies (name, phone, email address) VALUES ({registrationDTO.Company}, {registrationDTO.Phone}, {registrationDTO.CompanyEmail}";
        //}
    }
}
