export class CompanyMember {
  firstname: string;
  lastname: string;
  email: string;
  companyName: string;
  contactPerson: string;
  mail: string;
  id: Number;
  constructor(id: Number,firstname: string, lastname: string, email: string, companyName: string, 
    contactPerson: string,
    mail: string) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.companyName = companyName;
    this.contactPerson = contactPerson;
    this.mail = mail;
  }
}
