using DA.Models.DTOs;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace DA {
    public class MailMaker {

        public MailMaker() {
        }

        public void sendMail(string Email, string ContactPerson, string NameOfSchooling, DateTime start, List<ParticipantDTO> participants) {
            try {
                var smtpClient = new SmtpClient("smtp.gmail.com") {
                    Port = 587,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential("isabelle.arthofer@gmail.com", "3dfj#8JkIA"),
                    EnableSsl = true,
                };
                //SmtpClient smtpClient = new SmtpClient("moveit-at.mail.protection.outlook.com");

                var mailMessage = new MailMessage {
                    //From = new MailAddress("trainings@moveit.at"),
                    From = new MailAddress("isabelle.arthofer@gmail.com"),
                    Subject = "Test",
                    Body = GetEmailString(ContactPerson, NameOfSchooling, start, participants),
                    IsBodyHtml = true,
                };
                mailMessage.To.Add(Email);

                smtpClient.Send(mailMessage);
            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
            }
        }

        private string GetEmailString(string ContactPerson, string NameOfSchooling, DateTime start, List<ParticipantDTO> participants) {
            string text = File.ReadAllText("email.html");
            text.Replace("ContactPerson", ContactPerson);
            text.Replace("NameOfSchooling", NameOfSchooling);
            text.Replace("StartDateAndEndDate", start.ToString("yyyy-MM-dd"));
            string participantsText = "";
            participants.ForEach(x => participantsText += x.Firstname + x.Lastname + " ");
            Console.WriteLine(text);
            return text.Replace("ParticipantNames", participantsText);
            


        }
    }
}
