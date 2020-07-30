import { Member } from "../registration/Member";
import { CompanyMember } from "./CompanyMember";

export class BackendDetailDto {
  id: Number;
  name: string;
  start: Date;
  end: Date;
  price: Number;
  zipCode: Number;
  city: string;
  street: string;
  streetNumber: Number;
  country: string;
  organizer: string;
  contactPerson: string;
  email: string;
  website: string;
  phone: string;
  isFree: boolean;
  participants: CompanyMember[];
  availablePlaces: Number;

  constructor(id: Number,    name: string,    start: Date,    end: Date,    price: Number,    zipCode: Number,    city: string,    street: string,    streetNumber: Number,    country: string,    organizer: string,
    contactPerson: string,
    email: string,
    website: string,
    phone: string,
    isFree: boolean,
    participants: CompanyMember[],
    availablePlaces: Number) {

    this.id =id;
    this.name = name;
    this.start =  start;
    this.end =  end;
    this.price =  price;
    this.zipCode =  zipCode;
    this.city =  city;
    this.street =  street;
    this.streetNumber =  streetNumber;
    this.country =  country;
    this.organizer =  organizer;
    this.contactPerson =  contactPerson;
    this.email =  email;
    this.website =  website;
    this.phone =  phone;
    this.isFree = isFree;
    this.participants =  participants;
    this.availablePlaces =  availablePlaces;

  }
}
 
