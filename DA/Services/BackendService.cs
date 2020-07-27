using DA.Models.DTOs;
using Schulungskalender.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace DA.Services {
    public class BackendService {
        private readonly Database db;
        private readonly RessourceDtoConverter converter;

        private List<AddressRessource> addresses;
        private List<CompanyRessource> companies;
        private List<OrganizerRessource> organizers;
        private List<PersonRessource> persons;
        private List<RegistrationRessource> registrations;
        private List<SchoolingRessource> schoolings;

        public BackendService() {
            db = new Database();
            converter = new RessourceDtoConverter();

            FillLists();
        }

        internal bool Login(LoginUser user) {
            //checkCredentials
            return true;
        }

        public List<BackendSummaryDTO> GetSchoolings() {
            return schoolings.Select(x => converter.getBackendSummaryDTO(x)).ToList();
        }


        public BackendDetailDTO GetSchoolings(int id) {
            //var schooling = schoolings.Where(x => x.Id == id);
            //var address = FindAddress(schooling);
            //var organizer = FindOrganizer(schooling);
            //var participants = GetParticipants(id);
            //return converter.getbackendDetaiDTO(schooling, address, organizer);
            return null;
        }

       

        public string EditSchooling(int id, BackendDetailDTO schooling) {
            //var address = FindAddress(schooling);
            //var organizer = FindOrganizer(schooling);
            //return db.UpdateSchooling(schooling);
            return "test successfull";
        }

        public string InsertSchooling(BackendDetailDTO schooling) {
            return "test successfull";
            //return db.InsertSchooling(schooling);
        }

        private void FillLists() {
            addresses = new List<AddressRessource>();
            companies = new List<CompanyRessource>();
            organizers = new List<OrganizerRessource>();
            persons = new List<PersonRessource>();
            registrations = new List<RegistrationRessource>();
            schoolings = new List<SchoolingRessource>();

            db.GetAllTables(ref addresses, ref companies, ref schoolings, ref organizers, ref registrations, ref persons);
        }

        private AddressRessource FindAddress(BackendDetailDTO registration) {
            return addresses.Find(x => x.ZipCode == registration.ZipCode && x.Street == registration.Street && x.StreetNumber == registration.StreetNumber && x.City == registration.City && x.Country == registration.Country);
        }

        private OrganizerRessource FindOrganizer(BackendDetailDTO registration) {
            return organizers.Find(x => x.Email == registration.Email && x.Name == registration.Organizer && x.Phone == registration.Phone && x.ContactPerson == registration.ContactPerson);
        }

        private ParticipantDTO GetParticipants(int id) {
            throw new NotImplementedException();
        }

    }
}
