import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BackendDetailDto } from './BackendDetailDto';

import { Member } from '../registration/Member';
import { MatTable, MatDialog } from '@angular/material';
import { Location } from '../registration/Location';
import { DialogOrganizerComponent } from '../dialog-organizer/dialog-organizer.component';
import { DialogCompanyComponent } from '../dialog-company/dialog-company.component';
import { CompanyMember } from './CompanyMember';
import { Organizer } from './Organizer';
import { DialogAddPartComponent } from '../dialog-add-part/dialog-add-part.component';
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
  organizer: Organizer[] = [];
  contactPerson: string;
  email: string;
  website: string;
  phone: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  sizeOfSchooling: Number;
  organizerName: Organizer;
  price: Number;
  companyName: string;
  companys: string[] = [];
  firstname: string="";
  lastname: string="";
  mail: string = "";
  companyContactPerson: string = "";
  companyMail: string = "";

  organizerDto: Organizer
  newOrganizer: string = "";
  lat: Number = 48.1505921;
  lon: Number = 14.0069141;

  markerLat: Number;
  markerLng: Number;
  locations: Location[] = [];
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild('btnSchooling1', { static: true }) private btnSchooling1: ElementRef;
  @ViewChild('btnSchooling2', { static: true }) private btnSchooling2: ElementRef;
  @ViewChild('btnSchooling3', { static: true }) private btnSchooling3: ElementRef;
    readyToPost: boolean=false;
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, public dialog: MatDialog) {
    this.route.queryParams.subscribe(p => {
     
      this.detailId = p["id"];
      console.log(this.detailId);
      this.fillComboboxes();
      if (this.detailId > 0) {
        
        this.getDetails();
     
        this.btnSchooling1.nativeElement.innerHTML = "Schulung speichern";
        this.btnSchooling2.nativeElement.innerHTML = "Schulung speichern";
        this.btnSchooling3.nativeElement.innerHTML = "Schulung speichern";
     
      }

  

     
    })
  }
  displayedColumns: string[] = ['firstname', 'lastname', 'email','delete'];
  category: string[] = [
    "moveIT@ISS+Grundlagen",
    "moveIT@ISS+Workshop",
    "moveIT@ISS+Administrator",
    "moveIT@ISS+Kombimodell"
  ];
  members: CompanyMember[]=[];
  dataSource = this.members;
  emails: string[] = [];
  ngOnInit() {
  
   
   
  
  }
  saveAndNew() {
    if (this.detailId > 0) {
      console.log("Schulung geändert");
      this.editSchooling(false);
    }
    else {
      console.log("Schulung anlegt");
      this.addSchooling(false);
    }
    if (this.detailId > 0) {
      this.btnSchooling1.nativeElement.innerHTML = "Schulung anlegen";
      this.btnSchooling2.nativeElement.innerHTML = "Schulung anlegen";
      this.btnSchooling3.nativeElement.innerHTML = "Schulung anlegen";
    }
    this.dataSource = [];
    this.table.renderRows();
    this.detailId = 0;
   

  }
  fillComboboxes() {
    this.getCompanys(`https://localhost:5001/backend/companies`)
      .subscribe(x => {
        console.log(x);
        this.companys = x;
      })
    this.getOrganizer(`https://localhost:5001/backend/organizers`)
      .subscribe(x => {
        console.log(x);
        this.organizer = x;
         
        //DISTINCT
      })
    
  }
  changeOrganizer() {
    console.log("changing");
    console.log(this.organizerName);
    let shownO = this.organizer.find(x => x.name === this.organizerName.name);
    this.contactPerson = shownO.contactPerson;
    this.phone = shownO.phone;
    this.website = shownO.website;
    this.email = shownO.email;
  }
  addOrganizer() {
   
      const dialogRef = this.dialog.open(DialogOrganizerComponent, {
        width: '400px',
        data: { org: this.newOrganizer }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.newOrganizer = result;

        this.organizer.push(new Organizer(this.organizer.length,this.newOrganizer,"","","",""));
        this.organizerName.name = this.newOrganizer;
      });
   
   
  }
  //addCompany() {
  //  this.companyName = "";
  //  const dialogRef = this.dialog.open(DialogCompanyComponent, {
  //    width: '400px',
  //    data: {
  //      name: this.companyName,
  //      contactperson: this.companyContactPerson,
  //      mail: this.companyMail
  //    }
  //  });

  //  dialogRef.afterClosed().subscribe(result => {
  //    console.log(result);
  //    this.companyName = result.name;
  //    this.companyContactPerson = result.contactperson;
  //    this.companyMail = result.mail;

  //    this.companys.push(this.companyName);
     
  //  });
 

  //}
  addPart() {
    this.companyName = "";
    const dialogRef = this.dialog.open(DialogAddPartComponent, {
      width: '400px',
      data: {
        companys: this.companys,
        firstname: this.firstname,
        lastname: this.lastname,
        mail: this.mail,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.firstname = result.firstname;
      this.lastname= result.lastname;
      this.mail= result.mail;
      this.companyName= result.companyName;
      //this.companyName = result.name;
      //this.companyContactPerson = result.contactperson;
      //this.companyMail = result.mail;

      this.companys.push(this.companyName);
      this.addMember();

    });

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

    this.organizerName = this.organizer.find(x => x.name === this.backendDto.organizer);
    console.log(this.organizerName);
    
    console.log(this.organizerName);
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
    this.fillDetails();
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
  checkInputs() {
    if (this.catName != "" && this.startDate != null, this.endDate != null, this.price != null, Number(this.zipCode) != null, this.city != null, this.street != null, Number(this.streetNumber) != null,
      this.country != null, this.organizerName.name != null, this.sizeOfSchooling != null) {
      this.readyToPost = true;
    }
  }
  addSchooling(goBack: boolean) {
    if (this.detailId>0) {
      this.editSchooling(true);
    }
    else {
      this.checkInputs();
      if (this.readyToPost) {
        this.postSchooling(new BackendDetailDto(10, this.catName, this.startDate, this.endDate, this.price, Number(this.zipCode), this.city, this.street, Number(this.streetNumber),
          this.country, this.organizerName.name, this.contactPerson, this.email, this.website, this.phone, true, this.dataSource, this.sizeOfSchooling))
          .subscribe(x => {
            console.log(x);
            if (goBack) {
              this.router.navigate(["/start"]);
            }



          });
      }
     
    }
  
    

   
  }
  editSchooling(goBack:boolean) {
   
    this.putSchooling(new BackendDetailDto(10, this.catName, this.startDate, this.endDate, this.price, Number(this.zipCode), this.city, this.street, Number(this.streetNumber),
      this.country, this.organizerName.name, this.contactPerson, this.email, this.website, this.phone, true, this.dataSource, this.sizeOfSchooling))
      .subscribe(x => {
        console.log(x);
        if (goBack) {
          this.router.navigate(["/start"]);
        }


      });


  }
  postSchooling(reg: BackendDetailDto): Observable<BackendDetailDto> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    console.log("post");
    return this.http.post<BackendDetailDto>(`https://localhost:5001/backend/schoolings`, reg, httpOptions);
  }
  putSchooling(reg: BackendDetailDto): Observable<BackendDetailDto> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    
    console.log("put");
      return this.http.put<BackendDetailDto>(`https://localhost:5001/backend/schoolings/${this.detailId}`, reg, httpOptions);
 
  }
  getCompanys(url:string): Observable<string[]> {
     return this.http.get<string[]>(url);

  }
  getOrganizer(url:string): Observable<Organizer[]> {
    return this.http.get<Organizer[]>(url);
  }

  addMember() {
    console.log(this.firstname);
    this.dataSource.push(new CompanyMember(this.dataSource.length + 1, this.firstname, this.lastname, this.mail, this.companyName, this.companyContactPerson, this.companyMail));
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
     //Löschen richtig machen mit index
    this.dataSource = this.dataSource.splice(id, 1);
    console.log(this.dataSource.length);
    this.table.renderRows();
  }

}
