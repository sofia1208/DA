﻿using DA.Models;
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

namespace Schulungskalender.Services {
    public class SchoolingService {
        private List<SchoolingSummaryDTO> testList;

        //DataTable dataTable = new DataTable();
        public SchoolingService() {
            //var con = "Server=10.0.0.12:3313;Database=educationPlanner;Uid=ep;Pwd=eDpL2%0!;persistsecurityinfo=True";

            //using SqlConnection db = new SqlConnection(con);

            //SqlCommand cmd = new SqlCommand("SELECT * FROM adresses", db);
            //db.Open();

            //SqlDataAdapter da = new SqlDataAdapter(cmd);
            //da.Fill(dataTable);
            //db.Close();
            //da.Dispose();

            

            testList = new List<SchoolingSummaryDTO>() { };
            testList.Add(new SchoolingSummaryDTO() { Id = 1, Address = "Wels", Start = DateTime.Now.AddDays(-2), End = DateTime.Now, Name = "moveIT@ISS+Grundlagen", Organizer = "moveIT Software GmbH", Price = 500 });
            testList.Add(new SchoolingSummaryDTO() { Id = 2, Address = "Wels", Start = DateTime.Now.AddDays(-2), End = DateTime.Now, Name = "moveIT@ISS+Workshop", Organizer = "moveIT Software GmbH", Price = 510 });
            testList.Add(new SchoolingSummaryDTO() { Id = 3, Address = "Wels", Start = DateTime.Now.AddDays(-2), End = DateTime.Now, Name = "moveIT@ISS+Administrator", Organizer = "moveIT Software GmbH", Price = 520 });
            testList.Add(new SchoolingSummaryDTO() { Id = 4, Address = "Wels", Start = DateTime.Now.AddDays(-2), End = DateTime.Now, Name = "moveIT@ISS+Kombimodell", Organizer = "moveIT Software GmbH", Price = 530 });
        }

        public List<SchoolingSummaryDTO> Summary(string type) {

            return testList.Where(x => x.Name.Split('+')[1].Trim().Equals(type)).ToList();
        }

        public List<SchoolingSummaryDTO> Summary() {
            
            return testList;
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

            SchoolingContext db = new SchoolingContext();
            int length = db.Addresses.Count();

            return new SchoolingDetailDTO() {Id = length, City = "Wels", Email = "mail@test.com", End = DateTime.Now, Start = DateTime.Now.AddDays(-1), Organizer = "MoveIT, trainings@moveit.at", Phone = "+43 1234 56789", Price = 285, Street = "Durisolstraße 7" };
        }

        public FullRegistrationDTO Register(FullRegistrationDTO registration) {
            return registration;
        }
    }
}
