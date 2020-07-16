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
            return schoolings.Select(x => converter.GetSchoolingSummary(x, IsSchoolingFree(x.Id))).Where(x => x.Name.Split('+')[1].Trim().ToLower().Equals(type)).ToList();
        }

        public List<SchoolingSummaryDTO> Summary() {
            return schoolings.Select(x => converter.GetSchoolingSummary(x, IsSchoolingFree(x.Id))).ToList();
        }

        public SchoolingDetailDTO GetDetails(int id) {
            var schooling = schoolings.Find(x => x.Id == id);
            var address = addresses.Find(x => x.Id == schooling.AddressId);
            var organizer = organizers.Find(x => x.Id == schooling.OrganizerId);

            return converter.GetSchoolingDetail(schooling, address, organizer, IsSchoolingFree(id));
        }

        public RegistrationDTO Register(RegistrationDTO registration) {
            //mailMaker.sendMail();

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
    }
}
