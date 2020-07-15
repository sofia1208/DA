using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace DA {
    public class MailMaker {

        public MailMaker() {
        }

        public void sendMail() {
            try {
                var smtpClient = new SmtpClient("smtp.gmail.com") {
                    Port = 587,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential("isabelle.arthofer@gmail.com", "3dfj#8JkIA"),
                    EnableSsl = true,
                };

                var mailMessage = new MailMessage {
                    From = new MailAddress("isabelle.arthofer@gmail.com"),
                    Subject = "Test",
                    Body = "<h1>Test</h1>",
                    IsBodyHtml = true,
                };
                mailMessage.To.Add("isi.gaubinger@gmail.com");

                smtpClient.Send(mailMessage);
            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
            }
        }
    }
}
