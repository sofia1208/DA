import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SchoolingDto } from '../calendar/SchoolingDto';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomEvent } from '../calendar/CustomEvent';
import { CalendarComponent } from '../calendar/calendar.component';
import { ActivatedRoute } from '@angular/router';
import { Member } from './Member';
import { MatTable } from '@angular/material';
import { Registration } from './Registration';
import { AgmMap, MouseEvent, MapsAPILoader } from '@agm/core';
import { Location } from './Location';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  private geocoder: any;
  @ViewChild(AgmMap, { static: true }) public agmMap: AgmMap;
  refresh: Subject<any> = new Subject();
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  preis: string = ''
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


  company: string= "";
  companyPhone: string = "";
  companyMail: string = "";
  companyStreet: string = "";
  companyStreetNumber: Number;
  companyZipCode: Number;
  companyCity: string = "";
  companyCountry: string = "";
  locations: Location[]= [];
  lat: Number = 48.1505921;
  lon: Number = 14.0069141;

  markerLat: Number = 48.1505921;
  markerLng: Number= 14.0069141;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  dataSource = this.members;

  schooling: SchoolingDto;
  constructor(private http: HttpClient, private route: ActivatedRoute, private apiloader: MapsAPILoader) {
    console.log("constructor");
    this.route.queryParams.subscribe(p => {
      this.detailId = p["id"];
    })
    this.getEvent(this.detailId); 
  }

  displayedColumns: string[] = ['firstname', 'lastname', 'email'];
  ngOnInit(): void {
    console.log('on init registration');
      this.getEvent(this.detailId); 
    
  }
  getAddress() {
    console.log(this.adresse);
    this.getCoordinates(`https://us1.locationiq.com/v1/search.php?key=a7a297deff5f8b&q=${this.adresse}&format=json`)
      .subscribe(x => {
        this.locations = x;
        console.log(x);
        this.toCoordinate();
      }
       );
  
  }
  toCoordinate(): void {
    let first = this.locations[0];
    this.lat = first.lat;
    this.lon = first.lon;
    this.markerLat = first.lat;
    this.markerLng = first.lon;
    console.log(first.lat + " " + first.lon);
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

   // this.getAddress();
  
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
          this.fillDetails(schooling);
          this.submit();
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
  submit(): void {
    console.log("Submit registration");
    this.addCompanyToSchooling(new Registration(Number(this.detailId), this.company, this.companyPhone, this.companyMail, this.companyStreet, Number(this.companyStreetNumber), Number(this.companyZipCode), this.companyCity, this.companyCountry, this.members))
      .subscribe(x => console.log(x));

  }
  addCompanyToSchooling(reg: Registration): Observable<Registration> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    return this.http.post<Registration>(`https://localhost:5001/schoolings/registration`, reg, httpOptions);
  }

  
  
  private getDetail(url: string): Observable<SchoolingDto> {
    return this.http.get<SchoolingDto>(url);

  }
  private getCoordinates(url: string): Observable<Location[]> {
    return this.http.get<Location[]>(url);

  }

  

}
