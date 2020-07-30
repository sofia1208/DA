using DA.Models;
using DA.Models.DTOs;
using MySql.Data.MySqlClient;
using Schulungskalender.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Permissions;
using System.Threading.Tasks;

namespace DA {
    public class Database {
        private readonly string connectionString;
        private readonly MySqlConnection connection;

        public Database() {
            connectionString = "server=wp338.webpack.hosteurope.de;database=db12449415-dpl2020;Uid=db12449415-dpl;Pwd=IsaSof%20;persistsecurityinfo=True;convert zero datetime=True;";
            connection = new MySqlConnection(connectionString);
            connection.Open();
        }

        public void GetAllTables(
                ref List<AddressRessource> addresses,
                ref List<CompanyRessource> companies,
               ref List<SchoolingRessource> schoolings,
                ref List<OrganizerRessource> organizers,
                ref List<RegistrationRessource> registrations,
                ref List<PersonRessource> persons) {
            GetAddresses(ref addresses);
            GetCompanies(ref companies);
            GetOrganizers(ref organizers);
            GetPersons(ref persons);
            GetSchoolings(ref schoolings);
            GetRegistrations(ref registrations);
        }



        public void GetAddresses(ref List<AddressRessource> addresses) {
            addresses = new List<AddressRessource>();

            try {
                var getAddressesCmd = new MySqlCommand("SELECT * FROM addresses", connection);

                AddressRessource address;
                using MySqlDataReader reader = getAddressesCmd.ExecuteReader();
                while (reader.Read()) {
                    address = new AddressRessource() {
                        Id = reader.GetInt32(0),
                        Street = reader.GetString(1) ?? "",
                        StreetNumber = reader[2] as int? ?? 0,
                        ZipCode = reader[3] as int? ?? 0,
                        City = reader.GetString(4) ?? "",
                        Country = reader.GetString(5) ?? ""
                    };
                    addresses.Add(address);
                }
            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
            }
        }

        

        public void GetCompanies(ref List<CompanyRessource> companies) {
            companies = new List<CompanyRessource>();

            try {
                var getCompaniesCmd = new MySqlCommand("SELECT * FROM companies", connection);

                CompanyRessource company;
                using MySqlDataReader reader = getCompaniesCmd.ExecuteReader();
                while (reader.Read()) {
                    company = new CompanyRessource() {
                        Id = reader.GetInt32(0),
                        Name = reader[1] as string ?? "",
                        ContactPerson = reader[2] as string ?? "",
                        Email = reader[3] as string ?? "",
                        AddressId = reader[4] as int? ?? 0,
                        Phone = reader[5] as string ?? "",
                    };
                    companies.Add(company);
                }
            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
            }



        }

        

        public void GetOrganizers(ref List<OrganizerRessource> organizers) {
            organizers = new List<OrganizerRessource>();

            try {
                var getOrganizersCmd = new MySqlCommand("SELECT * FROM organizers", connection);

                OrganizerRessource organizer;
                using MySqlDataReader reader = getOrganizersCmd.ExecuteReader();
                while (reader.Read()) {
                    organizer = new OrganizerRessource() {
                        Id = reader.GetInt32(0),
                        Name = reader.GetString(1) ?? "",
                        ContactPerson = reader.GetString(2) ?? "",
                        Email = reader.GetString(3) ?? "",
                        Website = reader[4] as string ?? "",
                        Phone = reader[5] as string ?? ""
                    };
                    organizers.Add(organizer);
                }
            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
            }
        }

        

        public void GetPersons(ref List<PersonRessource> persons) {
            persons = new List<PersonRessource>();

            try {
                var getPersonsCmd = new MySqlCommand("SELECT * FROM persons", connection);

                PersonRessource person;
                using MySqlDataReader reader = getPersonsCmd.ExecuteReader();
                while (reader.Read()) {
                    person = new PersonRessource() {
                        Id = reader.GetInt32(0),
                        Firstname = reader.GetString(1) ?? "",
                        Lastname = reader.GetString(2) ?? "",
                        Email = reader.GetString(3) ?? "",
                        CompanyId = reader[4] as int? ?? 0,
                    };
                    persons.Add(person);
                }
            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
            }


        }

        public void GetSchoolings(ref List<SchoolingRessource> schoolings) {
            schoolings = new List<SchoolingRessource>();

            try {
                var getSchoolingsCmd = new MySqlCommand("SELECT * FROM schoolings", connection);

                SchoolingRessource schooling;
                using MySqlDataReader reader = getSchoolingsCmd.ExecuteReader();
                while (reader.Read()) {
                    schooling = new SchoolingRessource() {
                        Id = reader.GetInt32(0),
                        Name = reader.GetString(1) ?? "",
                        AddressId = reader.GetInt32(2),
                        Start = reader.GetDateTime(3),
                        End = reader.GetDateTime(4),
                        Price = reader[5] as int? ?? 0,
                        OrganizerId = reader[6] as int? ?? 0,
                        Places = reader[7] as int? ?? 0,
                        Display = reader.GetBoolean(8)
                    };
                    schoolings.Add(schooling);
                }
            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
            }


        }

        public void GetRegistrations(ref List<RegistrationRessource> registrations) {
            registrations = new List<RegistrationRessource>();

            try {
                registrations = new List<RegistrationRessource>();

                var getRegistrationCmd = new MySqlCommand("SELECT * FROM registrations", connection);

                RegistrationRessource registration;
                using MySqlDataReader reader = getRegistrationCmd.ExecuteReader();
                while (reader.Read()) {
                    registration = new RegistrationRessource() { SchoolingId = reader.GetInt32(0), PersonId = reader.GetInt32(1) };
                    registrations.Add(registration);
                }
            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
            }



        }

        public bool InsertAddress(RegistrationDTO registrationDTO) {
            try {
                string insertstatement = $"INSERT INTO addresses(street, street_number, city, zip_code, country)" +
                                         $" VALUES('{registrationDTO.Street}', '{registrationDTO.StreetNumber}', '{registrationDTO.City}', '{registrationDTO.ZipCode}', '{registrationDTO.Country}');";

                var insertAddressCmd = new MySqlCommand(insertstatement, connection);
                insertAddressCmd.ExecuteNonQuery();
            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
                return false;
            }

            return true;

        }

        public bool InsertCompany(RegistrationDTO registrationDTO, int address_id) {
            try {
                string insertstatement = $"INSERT INTO companies(name, email, phone, address_id)" +
                                         $" VALUES('{registrationDTO.Company}', '{registrationDTO.CompanyEmail}', '{registrationDTO.Phone}', '{address_id}');";

                var insertCompanyCmd = new MySqlCommand(insertstatement, connection);
                insertCompanyCmd.ExecuteNonQuery();
            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
                return false;
            }

            return true;

        }

        public bool InsertCompany(ParticipantDTO person) {
            try {
                string insertstatement = $"INSERT INTO companies(name, contact_person, email)" +
                                         $" VALUES('{person.CompanyName}', '{person.ContactPerson}', '{person.CompanyEmail}');";

                var insertCompanyCmd = new MySqlCommand(insertstatement, connection);
                insertCompanyCmd.ExecuteNonQuery();
            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
                return false;
            }

            return true;
        }

        public bool InsertPerson(ParticipantDTO participantDTO, int company_id) {
            try {
                string insertstatement = $"INSERT INTO persons (firstname, lastname, email, company_id)" +
                                         $" VALUES ('{participantDTO.Firstname}', '{participantDTO.Lastname}', '{participantDTO.Email}', '{company_id}');";

                var insertPersonCmd = new MySqlCommand(insertstatement, connection);
                insertPersonCmd.ExecuteNonQuery();
            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
                return false;
            }

            return true;
        }

        public bool InsertPerson(ParticipantDTO participantDTO, CompanyRessource company) {
            try {
                string insertstatement = $"INSERT INTO persons (firstname, lastname, email, company_id)" +
                                         $" VALUES ('{participantDTO.Firstname}', '{participantDTO.Lastname}', '{participantDTO.Email}', '{company.Id}');";

                var insertPersonCmd = new MySqlCommand(insertstatement, connection);
                insertPersonCmd.ExecuteNonQuery();
            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
                return false;
            }

            return true;
        }

        public bool InsertRegistration(int schooling_id, int person_id) {
            try {
                string insertstatement = $"INSERT INTO registrations (schooling_id, person_id) " +
                                         $"VALUES ('{schooling_id}', '{person_id}')";

                var insertRegistrationCmd = new MySqlCommand(insertstatement, connection);
                insertRegistrationCmd.ExecuteNonQuery();
            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
                return false;
            }


            return true;
        }

        public bool deleteSchooling(int id) {
            try {
                string deleteStatement = $"DELETE FROM schoolings WHERE schooling_id = '{id}'";
                var deleteschoolingCmd = new MySqlCommand(deleteStatement, connection);
                deleteschoolingCmd.ExecuteNonQuery();
            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
                return false;
            }

            return true;
        }

        public bool InsertAddress(BackendDetailDTO backendDetail) {
            try {
                string insertstatement = $"INSERT INTO addresses(street, street_number, city, zip_code, country)" +
                                         $" VALUES('{backendDetail.Street}', '{backendDetail.StreetNumber}', '{backendDetail.City}', '{backendDetail.ZipCode}', '{backendDetail.Country}');";

                var insertAddressCmd = new MySqlCommand(insertstatement, connection);
                insertAddressCmd.ExecuteNonQuery();
            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
                return false;
            }

            return true;

        }

        public bool InsertOrganizer(BackendDetailDTO backendDetail) {
            try {
                string insertstatement = $"INSERT INTO organizers(name, contact_person, email, website, phone)" +
                                         $" VALUES('{backendDetail.Organizer}', '{backendDetail.ContactPerson}', '{backendDetail.Email}', '{backendDetail.website}', '{backendDetail.Phone}');";

                var insertOrganizerCmd = new MySqlCommand(insertstatement, connection);
                insertOrganizerCmd.ExecuteNonQuery();
            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
                return false;
            }

            return true;
        }
       

        public bool InsertSchooling(BackendDetailDTO backendDetail, int addressId, int organizerId) {
            try {
                string insertstatement = $"INSERT INTO schoolings(name, address_id, start, end, organizer_id, number_of_places, price)" +
                                         $" VALUES('{backendDetail.Name}', '{addressId}', '{backendDetail.Start:yyyy-MM-dd HH:mm:ss}', '{backendDetail.End:yyyy-MM-dd HH:mm:ss}', '{organizerId}', '{backendDetail.availablePlaces}', '{backendDetail.Price}');";

                var insertSchoolingCmd = new MySqlCommand(insertstatement, connection);
                insertSchoolingCmd.ExecuteNonQuery();
            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
                return false;
            }

            return true;
        }

        public bool UpdateSchooling(BackendDetailDTO backendDetail, int addressId, int organizerId) {
            try {
                string updateStatement = $"UPDATE schoolings " +
                                         $"SET name='{backendDetail.Name}', address_id='{addressId}', start='{backendDetail.Start:yyyy-MM-dd HH:mm:ss}', end='{backendDetail.End:yyyy-MM-dd HH:mm:ss}', organizer_id='{organizerId}', number_of_places= '{backendDetail.availablePlaces}', price='{backendDetail.Price}'"+
                                         $"WHERE schooling_id={backendDetail.Id};";

                var updateSchoolingCmd = new MySqlCommand(updateStatement, connection);
                updateSchoolingCmd.ExecuteNonQuery();
            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
                return false;
            }

            return true;
        }


        public bool DeleteRegistration(int schoolingId, int participantId) {
            try {
                string deleteStatement = $"DELETE FROM registrations WHERE schooling_id = '{schoolingId}' AND person_id = '{participantId}'";

                var deleteRegistrationCmd = new MySqlCommand(deleteStatement, connection);
                deleteRegistrationCmd.ExecuteNonQuery();
            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
                return false;
            }

            return true;
        }

        public bool RemoveAllForId(int id) {
            try {
                string deleteStatement = $"DELETE FROM registrations WHERE schooling_id = '{id}'";

                var deleteRegistrationCmd = new MySqlCommand(deleteStatement, connection);
                deleteRegistrationCmd.ExecuteNonQuery();
            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
                return false;
            }

            return true;
        }

        public bool UpdateSchooling(int id, bool isDisplayed) {
            try {
                string updateStatement = $"UPDATE schoolings " +
                                         $"SET display={isDisplayed} " +
                                         $"WHERE schooling_id={id};";

                var updateSchoolingCmd = new MySqlCommand(updateStatement, connection);
                updateSchoolingCmd.ExecuteNonQuery();
            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
                return false;
            }

            return true;
        }




    }
}
