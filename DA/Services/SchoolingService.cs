using DA.Models;
using Schulungskalender.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Schulungskalender.Services {
    public class SchoolingService {

        public List<SchoolingSummaryDTO> Summary(string type) {
            var list = new List<SchoolingSummaryDTO>() { };
            list.Add(new SchoolingSummaryDTO() { Address = "Wels", Start = DateTime.Now.AddDays(-2), End = DateTime.Now, Name = "moveIT@ISS+Grundlage", Organizer = "moveIT Software GmbH", Price = 500 });
            list.Add(new SchoolingSummaryDTO() { Address = "Wels", Start = DateTime.Now.AddDays(-2), End = DateTime.Now, Name = "moveIT@ISS+Workshop", Organizer = "moveIT Software GmbH", Price = 510 });
            list.Add(new SchoolingSummaryDTO() { Address = "Wels", Start = DateTime.Now.AddDays(-2), End = DateTime.Now, Name = "moveIT@ISS+Administrator", Organizer = "moveIT Software GmbH", Price = 520 });
            list.Add(new SchoolingSummaryDTO() { Address = "Wels", Start = DateTime.Now.AddDays(-2), End = DateTime.Now, Name = "moveIT@ISS+Kombimodell", Organizer = "moveIT Software GmbH", Price = 530 });

            if(type == "" || type == null) {
                return list;
            }
            return list.Where(x => x.Name.Split('+')[1].Trim().Equals(type)).ToList();

        }

        public SchoolingDetailDTO GetDetails(int id) {
            return new SchoolingDetailDTO() { City = "Wels", Email = "mail@test.com", End = DateTime.Now, Start = DateTime.Now.AddDays(-1), Organizer = "MoveIT, trainings@moveit.at", Phone = "+43 1234 56789", Price = 285, Street = "Durisolstraße 7" };
        }

        public FullRegistrationDTO Register(FullRegistrationDTO registration) {
            return registration;
        }
    }
}
