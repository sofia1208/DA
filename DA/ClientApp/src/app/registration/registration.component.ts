import { Component, OnInit } from '@angular/core';
import { SchoolingDto } from '../calendar/SchoolingDto';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CustomEvent } from '../calendar/CustomEvent';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  refresh: Subject<any> = new Subject();
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  preis: string = '3'
  organisator: string = '3'
  kontaktperson: string = '';
  telefon: string = '';
  adresse: string = ' ';
  detailTitle: string = 'moveIT@SQQ';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log('on init registration');
    this.getEvent(21);
  }

  fillDetails(schooling: SchoolingDto) {
    console.log('fill details');
    this.telefon = schooling.phone;
    this.convertToGermanTime(schooling);
    this.preis = schooling.price.toString() + " €";
    this.organisator = schooling.organizer;
    this.kontaktperson = schooling.contactPerson;

    this.startDate = new Date(schooling.start);
    this.endDate = new Date(schooling.end);
    this.adresse = schooling.street + " " + schooling.streetNumber + " " + schooling.zipCode + " " + schooling.city + ", " + schooling.country;
  
  }
  convertToGermanTime(schooling: SchoolingDto) {
    let start = new Date(schooling.start);
    let end = new Date(schooling.end);
    if (start.getHours() < 10) {
      this.startTime = "0" + start.getHours();
    }
    if (end.getHours() < 10) {
      this.endTime = "0" + end.getHours();
    }
    if (start.getMinutes() < 10) {
      this.startTime = this.startTime + ":0" + start.getMinutes();
    }
    if (end.getMinutes() < 10) {
      this.endTime = this.endTime + ":0" + end.getMinutes();
    }


  }
  private getDetail(url: string): Observable<SchoolingDto> {
    return this.http.get<SchoolingDto>(url);

  }
  getEvent(id: Number): void {


    let schooling = new SchoolingDto;
   
   
      this.getDetail(`https://localhost:5001/schoolings/details/${id}`)
        .subscribe(data => {
          schooling = data;
          console.log(data);

          this.fillDetails(schooling);


        }
          , err => {
            console.log(`${err.message}`)
          })
        ;
    
  }

}
