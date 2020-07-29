export class Member {
  firstname: string;
  lastname: string;
  email: string;
  id: Number;
  company: string;
  constructor(id: Number,firstname: string, lastname: string, email: string ,company:string) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.company = company;
  }
}
