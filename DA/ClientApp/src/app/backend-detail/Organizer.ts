export class Organizer {
  id: Number;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  constructor(id: Number,
    name: string,
    contactPerson: string,
    email: string,
    phone: string,
    website: string, ) {
    this.id = id;
    this.name = name;
    this.contactPerson = contactPerson;
    this.email = email;
    this.phone = phone,
      this.website = website;

  }
}
