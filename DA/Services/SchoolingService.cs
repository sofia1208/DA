using DA.Models;
using Schulungskalender.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Schulungskalender.Services {
    public class SchoolingService {

        public List<SchoolingSummaryDTO> Summary() {
            return new List<SchoolingSummaryDTO>() { new SchoolingSummaryDTO() { Address = "Wels", Start = DateTime.Now.AddDays(-2), End = DateTime.Now, Name = "moveIT@ISS+Grundlage", Organizer = "moveIT Software GmbH", Price = 530 } };
        }

        public SchoolingDetailDTO GetDetails(int id) {
            return new SchoolingDetailDTO() { City = "Wels", Email = "mail@test.com", End = DateTime.Now, Start = DateTime.Now.AddDays(-1), Organizer = "MoveIT, trainings@moveit.at", Phone = "+43 1234 56789", Price = 285, Street = "Durisolstraße 7" };
        }

        public FullRegistrationDTO Register(FullRegistrationDTO registration) {
            return registration;
        }
    }
}
