using DA.Models.DTOs;
using Org.BouncyCastle.Crypto.Prng;
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
            return schoolings.Select(x => converter.getBackendSummaryDTO(x)).OrderBy(x => x.Start).ToList();
        }

        public bool DeleteSchooling(int id) {
            var wasSuccessful = db.deleteSchooling(id);
            db.GetSchoolings(ref schoolings);
            return wasSuccessful;
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
            var address = FindAddress(schooling);
            if (address == null) {
                if (address == null)
                    wasSuccessful = db.InsertAddress(schooling);
                db.GetAddresses(ref addresses);
                address = FindAddress(schooling);
            }

            var organizer = FindOrganizer(schooling);
            if (organizer == null && wasSuccessful) {
                wasSuccessful = db.InsertOrganizer(schooling);
                db.GetOrganizers(ref organizers);
                organizer = FindOrganizer(schooling);
            }

            if (wasSuccessful) {
                wasSuccessful = db.InsertSchooling(schooling, address.Id, organizer.Id);
                db.GetSchoolings(ref schoolings);
            }
            return wasSuccessful;
        }

        public bool EditSchooling(int id, BackendDetailDTO schooling) {
            var wasSuccessful = true;
            var address = FindAddress(schooling);
            if (address == null) {
                if (address == null)
                    wasSuccessful = db.InsertAddress(schooling);
                db.GetAddresses(ref addresses);
                address = FindAddress(schooling);
            }

            var organizer = FindOrganizer(schooling);
            if (organizer == null && wasSuccessful) {
                wasSuccessful = db.InsertOrganizer(schooling);
                db.GetOrganizers(ref organizers);
                organizer = FindOrganizer(schooling);
            }

            if (wasSuccessful) {
                wasSuccessful = db.UpdateSchooling(schooling, address.Id, organizer.Id);
                db.GetSchoolings(ref schoolings);
            }
            return wasSuccessful;
        }


        internal bool EditParticipants(int id, List<ParticipantDTO> participants) {
            var wasSuccessful = db.RemoveAllForId(id);

        //    participants.ForEach(x => {
        //        if (wasSuccessful) {
        //            db.InsertPerson
        //        }
        //            ? db.InsertRegistration(id, x.Id) 
        //});
            db.GetRegistrations(ref registrations);
            return wasSuccessful;
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
            return organizers.Find(x => x.ContactPerson == schooling.ContactPerson && x.Email == schooling.Email && x.Name == schooling.Organizer && x.Phone == schooling.Phone);
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
