export class Member {
  firstname: string;
  lastname: string;
  email: string;
  id: Number;
  constructor(id: Number,firstname: string, lastname: string, email: string) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
  }
}
