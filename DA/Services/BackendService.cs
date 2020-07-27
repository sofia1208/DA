using DA.Models.DTOs;
using Schulungskalender.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DA.Services {
    public class BackendService {
        private readonly Database db;

        private List<AddressRessource> addresses;
        private List<CompanyRessource> companies;
        private List<OrganizerRessource> organizers;
        private List<PersonRessource> persons;
        private List<RegistrationRessource> registrations;
        private List<SchoolingRessource> schoolings;

        public BackendService() {
            db = new Database();

            fillLists();
        }

        public void GetSchoolings() {

        }

        public BackendDetailDTO GetSchoolings(int id) {
            return null;
        }

        public string EditSchooling(BackendDetailDTO schooling) {
            return "test successfull";
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

    }
}
