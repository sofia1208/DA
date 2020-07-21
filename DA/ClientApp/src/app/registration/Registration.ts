import { zip } from "rxjs";

export class Registration {
  schoolingId: Number;
  name: string;
  phone: string;
  email: string;
  street: string;
  streetNumber: Number;
  zipCode: Number;
  city: string;
  country: string;
  participates: string[];
  
  constructor(schoolingId: Number, name: string, phone: string, email: string, street: string, streetNumber: Number, zipCode: Number, city: string, country: string ) {

    this.name = name;
    this.schoolingId = schoolingId;
    this.phone = phone;
    this.email = email;
    this.street = street;
    this.streetNumber = streetNumber;
    this.zipCode = zipCode;
    this.city = city;
    this.country = country;
  }
}
