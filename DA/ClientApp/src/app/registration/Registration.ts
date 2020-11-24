import { zip } from "rxjs";
import { Member } from "./Member";

export class Registration {
  schoolingId: Number;
  company: string;
  phone: string;
  companyEmail: string;
  street: string;
  streetNumber: Number;
  zipCode: Number;
  city: string;
  country: string;
  participants: Member[];
  contactPersonTitle: string;
  contactPersonName: string;
 
  
  constructor(schoolingId: Number, company: string, phone: string, companyEmail: string, street: string, streetNumber: Number, zipCode: Number, city: string, country: string, participants: Member[], contactPersonTitle: string,contactPersonName:string ) {

    this.company = company;
    this.schoolingId = schoolingId;
    this.phone = phone;
    this.companyEmail = companyEmail;
    this.street = street;
    this.streetNumber = streetNumber;
    this.zipCode = zipCode;
    this.city = city;
    this.country = country;
    this.participants = participants;
    this.contactPersonName = contactPersonName;
    this.contactPersonTitle = contactPersonTitle
  
  }
}
