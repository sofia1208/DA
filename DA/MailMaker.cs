using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace DA {
    public class MailMaker {

        public MailMaker() {
        }

        public string Absender {
            get;
            set;
        }


        public List<string> Empfänger {
            get;
            set;
        }


        public List<string> Kopie {
            get;
            set;
        }


        public List<string> Blindkopie {
            get;
            set;
        }


        public List<Attachment> Anhänge {
            get;
            set;
        }


        public string Betreff {
            get;
            set;
        }


        public string Nachricht {
            get;
            set;
        }


        public string Username {
            get;
            set;
        }


        public string Passwort {
            private get;
            set;
        }


        public string Servername {
            get;
            set;
        }


        public string Port {
            get;
            set;
        }

        public void Send() {
            MailMessage Email = new MailMessage();

            MailAddress Sender = new MailAddress(Absender);
            Email.From = Sender;

            foreach (string empf in Empfänger)
                Email.To.Add(empf);

            if (Kopie.Count != 0)
                foreach (string kopie in Kopie)
                    Email.CC.Add(kopie);

            if (Blindkopie.Count != 0)
                foreach (string blindkopie in Blindkopie)
                    Email.Bcc.Add(blindkopie);

            if (Anhänge.Count != 0)
                foreach (Attachment anhang in Anhänge)
                    Email.Attachments.Add(anhang);

            Email.Subject = Betreff;

            Email.Body = Nachricht;

            SmtpClient MailClient = new SmtpClient(Servername, int.Parse(Port));

            string UserName = Username;
            string Password = Passwort;
            System.Net.NetworkCredential Credentials = new System.Net.NetworkCredential(UserName, Password);

            MailClient.Credentials = Credentials;

            MailClient.Send(Email);
        }
    }
}
