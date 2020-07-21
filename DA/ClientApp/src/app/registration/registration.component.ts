import { Component, OnInit, ViewChild } from '@angular/core';
import { SchoolingDto } from '../calendar/SchoolingDto';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CustomEvent } from '../calendar/CustomEvent';
import { CalendarComponent } from '../calendar/calendar.component';
import { ActivatedRoute } from '@angular/router';
import { Member } from './Member';
import { MatTable } from '@angular/material';
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
  organisator: string = ''
  kontaktperson: string = '';
  telefon: string = '';
  adresse: string = ' ';
  detailTitle: string = 'moveIT@SQQ';
  detailId: Number = 0;
  firstname: string = "";
  lastname: string="";
  email: string="";
  members: Member[] = [];
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  dataSource = this.members;
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(p => {
      this.detailId = p["id"];
    })
  }

  displayedColumns: string[] = ['firstname', 'lastname', 'email'];
  ngOnInit(): void {
    console.log('on init registration');

    this.getEvent(this.detailId);
   
  }

  fillDetails(schooling: SchoolingDto) {

    console.log('fill details');
    this.telefon = schooling.phone;
    this.convertToGermanTime(schooling);
    this.preis = schooling.price + " €";
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
    this.fillDetails(schooling);
  }
  addMember(): void {
   
  
    this.dataSource.push(new Member(this.firstname, this.lastname, this.email));
    this.table.renderRows();
    this.firstname = "";
    this.lastname = "";
    this.email = "";
   
  }
  private getDetail(url: string): Observable<SchoolingDto> {
    return this.http.get<SchoolingDto>(url);

  }
  

}
