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

        public bool DeleteSchooling(int id) {
            return db.deleteSchooling(id);
        }


        public BackendDetailDTO GetSchoolings(int id) {
            var schooling = schoolings.Find(x => x.Id == id);
            var address = FindAddress(schooling);
            var organizer = FindOrganizer(schooling);
            var participants = GetParticipants(id);
            var isFree = IsSchoolingFree(id);
            return converter.getbackendDetaiDTO(schooling, address, organizer, participants, isFree);
        }



        //public string EditSchooling(int id, BackendDetailDTO schooling) {
        //    //var address = FindAddress(schooling);
        //    //var organizer = FindOrganizer(schooling);
        //    //return db.UpdateSchooling(schooling);
        //    return "test successfull";
        //}

        //public string InsertSchooling(BackendDetailDTO schooling) {
        //    return "test successfull";
        //    //return db.InsertSchooling(schooling);
        //}

        private void FillLists() {
            addresses = new List<AddressRessource>();
            companies = new List<CompanyRessource>();
            organizers = new List<OrganizerRessource>();
            persons = new List<PersonRessource>();
            registrations = new List<RegistrationRessource>();
            schoolings = new List<SchoolingRessource>();

            db.GetAllTables(ref addresses, ref companies, ref schoolings, ref organizers, ref registrations, ref persons);
        }

        private bool IsSchoolingFree(int id) {
            return (schoolings.Find(x => x.Id == id).Places - registrations.Where(x => x.SchoolingId == id).Count() > 0);
        }

        private AddressRessource FindAddress(SchoolingRessource schooling) {
            return addresses.Find(x => x.Id == schooling.AddressId);
        }

        private OrganizerRessource FindOrganizer(SchoolingRessource schooling) {
            return organizers.Find(x => x.Id == schooling.OrganizerId);
        }

        private List<ParticipantDTO> GetParticipants(int id) {
            return registrations.Where(x => x.SchoolingId == id)
                .Select(x => x.PersonId)
                .Distinct()
                .Select(x => {
                    var personRessource = persons.Find(y => y.Id == x);
                    return new ParticipantDTO() { Firstname = personRessource.Firstname, Lastname = personRessource.Lastname, Email = personRessource.Email };
                    })
                .ToList();
        }

    }
}
