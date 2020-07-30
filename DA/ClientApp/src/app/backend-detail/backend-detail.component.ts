import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BackendDetailDto } from './BackendDetailDto';

import { Member } from '../registration/Member';
import { MatTable } from '@angular/material';
import { Location } from '../registration/Location';
@Component({
  selector: 'app-backend-detail',
  templateUrl: './backend-detail.component.html',
  styleUrls: ['./backend-detail.component.css']
})
export class BackendDetailComponent implements OnInit {
  detailId: Number;
  street: string;
  streetNumber: string;
  zipCode: string;
  city: string;
  country: string;
  catName: string = "";
  backendDto: BackendDetailDto;
  organizer: string[] = ["moveIT Software GmbH"];
  contactPerson: string;
  email: string;
  website: string;
  phone: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  sizeOfSchooling: Number;
  organizerName: string;
  price: Number;
  companyName: string;
  companys: string[] = [];
  firstname: string="";
  lastname: string="";
  mail: string = "";


  lat: Number = 48.1505921;
  lon: Number = 14.0069141;

  markerLat: Number;
  markerLng: Number;
  locations: Location[] = [];
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild('btnSchooling', { static: true }) private btnSchooling: ElementRef;
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.route.queryParams.subscribe(p => {
     
      this.detailId = p["id"];
      console.log(this.detailId);
      this.getDetails();

     
    })
  }
  displayedColumns: string[] = ['firstname', 'lastname', 'email','delete'];
  category: string[] = [
    "moveIT@ISS+Grundlagen",
    "moveIT@ISS+Workshop",
    "moveIT@ISS+Administrator",
    "moveIT@ISS+Kombimodell"
  ];
  members: Member[]=[];
  dataSource = this.members;
  emails: string[] = [];
  ngOnInit() {
  
    if (this.detailId > 0) {
      this.btnSchooling.nativeElement.innerHTML = "Schulung speichern";
    }
    
  
  }
  saveAndNew() {
    this.addSchooling(false);

  }
  copyAllMail() {
    this.emails = this.dataSource.map(x => x.email);
    console.log(this.emails);
    let val: string="";
    for (var i = 0; i < this.emails.length; i++) {
      val = val + this.emails[i] + "; "
    }

    
      let selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = val;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
    

  }
  fillDetails() {
    this.street= this.backendDto.street;
    this.streetNumber = this.backendDto.streetNumber.toString();
    this.zipCode = this.backendDto.zipCode.toString();
    this.city = this.backendDto.city;
    this.country = this.backendDto.country;
    this.catName = this.backendDto.name;
  
    this.startDate = this.backendDto.start;
    this.endDate = this.backendDto.end;
    let sT = new Date(this.backendDto.start);
    let eT = new Date(this.backendDto.end);
    this.convertToGermanTime(sT, eT);
    this.contactPerson = this.backendDto.contactPerson;
    this.organizerName = this.backendDto.organizer;
    this.email = this.backendDto.email;
    this.phone = this.backendDto.phone;
    this.website = this.backendDto.website;
    this.price = this.backendDto.price;

    this.dataSource = this.backendDto.participants;
    this.sizeOfSchooling = this.backendDto.availablePlaces;
    
  }
  getDetails() {
    this.getDetail(`https://localhost:5001/backend/schoolings/${this.detailId}`)
      .subscribe(data => {
        this.backendDto = data;
        console.log(data);

        this.fillDetails();

      })
  }
  private getDetail(url: string): Observable<BackendDetailDto> {
    return this.http.get<BackendDetailDto>(url);

  }
  showOnMap() {
    this.getAddress();

  }
  convertToGermanTime(start: Date, end:Date) {
 
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
  getAddress() {
    //Promise 
    let address = this.street + " " + this.streetNumber + " " + this.zipCode + " " + this.city;
    this.getCoordinates(`https://us1.locationiq.com/v1/search.php?key=a7a297deff5f8b&q=${address}&format=json`)
      .subscribe(x => {
        this.locations = x;
        console.log(x);
        this.toCoordinate();
      }
      );
    this.toCoordinate();
  }
  toCoordinate(): void {
    let first = this.locations[0];
    this.lat = first.lat;
    this.lon = first.lon;
    this.markerLat = first.lat;
    this.markerLng = first.lon;
 
    console.log(first.lat + " " + first.lon);
  }
  private getCoordinates(url: string): Observable<Location[]> {
    return this.http.get<Location[]>(url);

  }
  addSchooling(goBack: boolean) {
   
    console.log(this.startDate);
    this.addNewSchooling(new BackendDetailDto(10, this.catName, this.startDate, this.endDate, this.price, Number(this.zipCode) , this.city, this.street, Number(this.streetNumber),
      this.country, this.organizerName, this.contactPerson, this.email, this.website, this.phone, true, this.dataSource, this.sizeOfSchooling))
      .subscribe(x => {
        console.log(x);
        if (goBack) {
          this.router.navigate(["/start"]);
        }
      
      });

   
  }
 
  addNewSchooling(reg: BackendDetailDto): Observable<BackendDetailDto> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    if (this.detailId > 0) {
      console.log(this.detailId);
      return this.http.put<BackendDetailDto>(`https://localhost:5001/backend/schoolings/${this.detailId}`, reg, httpOptions);
       
    }
    else {
     

      return this.http.post<BackendDetailDto>(`https://localhost:5001/backend/schoolings`, reg, httpOptions);
    }
  
  }

  addMember() {
    console.log(this.firstname);
    this.dataSource.push(new Member(this.dataSource.length+1 ,this.firstname, this.lastname, this.mail, this.companyName));
    this.table.renderRows();
    this.firstname = "";
    this.lastname = "";
    this.mail = "";
  }
  printParticipants() {
    window.print();
  }
  deleteMember(id: number) {
    console.log(this.dataSource.length);

    this.dataSource = this.dataSource.splice(id, 1);
    console.log(this.dataSource.length);
    this.table.renderRows();
  }

}
