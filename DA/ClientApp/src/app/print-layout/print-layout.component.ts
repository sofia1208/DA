import { Component, OnInit, Input } from '@angular/core';
import { CustomEvent } from '../calendar/CustomEvent';
import { SchoolingDto } from '../calendar/SchoolingDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.css']
})
export class PrintLayoutComponent implements OnInit {

  constructor(private http: HttpClient) { }
  @Input()
  events: CustomEvent[];
  @Input()
  id: Number;
  schooling: SchoolingDto;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  preis: string = '';
  organisator: string = '';
  kontaktperson: string = '';
  telefon: string = '';
  adresse: string = '';
 
  ngOnInit() {
    console.log("oninit");
    this.onStart();
  }
  onStart() {

    this.getDetail(`https://localhost:5001/schoolings/details/${this.id}`)
      .subscribe(data => {
        this.schooling = data;
        console.log(data);

        this.fillDetails(this.schooling);
      })
  }
  fillDetails(schooling: SchoolingDto) {

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
    this.startTime = start.getHours().toString();
    this.endTime = end.getHours().toString();

    if (start.getHours() < 10) {
      this.startTime = "0" + start.getHours();
    }
    if (end.getHours() < 10) {
      this.endTime = "0" + end.getHours();
    }
    if (start.getMinutes() < 10) {
      this.startTime = this.startTime + ":0" + start.getMinutes();
    }
    else {
      this.startTime = this.startTime + ":" + start.getMinutes();
    }
    if (end.getMinutes() < 10) {
      this.endTime = this.endTime + ":0" + end.getMinutes();
    }
    else {
      this.endTime = this.endTime + ":" + end.getMinutes();
    }

  }

  private getDetail(url: string): Observable < SchoolingDto > {
        return this.http.get<SchoolingDto>(url);

      }

}
