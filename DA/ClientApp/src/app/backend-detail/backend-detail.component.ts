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
import { OrganizerDto } from './OrganizerDto';
import { DialogAddPartComponent } from '../dialog-add-part/dialog-add-part.component';
import { DialogSavingComponent } from '../dialog-saving/dialog-saving.component';
import { DialogAddCategoryComponent } from '../dialog-add-category/dialog-add-category.component';
import { DialogEditOrgCatComponent } from '../dialog-edit-org-cat/dialog-edit-org-cat.component';
import { DialogSuccessfulAddedComponent } from '../dialog-successful-added/dialog-successful-added.component';
import { BackendDetailService } from '../core/backend-detail.service';
import { CategoryDto } from './CategoryDto';
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
  catName: CategoryDto ;
  backendDto: BackendDetailDto;
  organizer: OrganizerDto[] = [];
  contactPerson: string;
  email: string;
  website: string;
  phone: string;
  startDate: Date = new Date();
  endDate: Date= new Date();
  startTime: string;
  endTime: string;
  sizeOfSchooling: Number;
  organizerName: OrganizerDto;
  price: Number;
  companyName: string;
  companys: string[] = [];
  firstname: string="";
  lastname: string="";
  mail: string = "";
  companyContactPerson: string = "";
  companyMail: string = "";
  sDate: Date;
  organizerDto: OrganizerDto
  newOrganizer: string = "";
  lat: Number = 48.1505921;
  lon: Number = 14.0069141;

  markerLat: Number;
  markerLng: Number;
  saved: boolean=true;
  locations: Location[] = [];
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild('btnSchooling1', { static: true }) private btnSchooling1: ElementRef;
  @ViewChild('btnSchooling2', { static: true }) private btnSchooling2: ElementRef;
  @ViewChild('btnSchooling3', { static: true }) private btnSchooling3: ElementRef;
  readyToPost: boolean = false;
  addOrEdit: string = "Schulung anlegen";
  newCategory: string;
  kurzbeschreibungHtml: string;
  contentLink: string;
  dateString: string;
    newContentLink: any;
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, public dialog: MatDialog, private backendService: BackendDetailService) {
    this.route.queryParams.subscribe(p => {
     
      this.detailId = p["id"];
      console.log(this.detailId);
     
      if (this.detailId > 0) {
        this.addOrEdit = "Schulung speichern";
        this.readyToPost = true;
      }
      this.sDate = new Date();
  

     
    })
  }
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'company', 'delete'];
  category: CategoryDto[] = [];
  members: CompanyMember[]=[];
  dataSource = this.members;
  emails: string[] = [];
  ngOnInit() {
    this.fillComboboxes();
    if (this.detailId > 0) {
    
      this.getDetails();
      this.fillDetails();
     
    }
    
  
  }
  goBack() {
  
    if (this.saved) {
      console.log("everything saved");
      this.router.navigate(["/start"]);
    }
    else {
      this.companyName = "";
      const dialogRef = this.dialog.open(DialogSavingComponent, {
        width: '400px',
        data: {
          saved: this.saved
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result != null) {
          this.saved = result.saved;
        }
        
       
        if (this.saved) {
          this.addSchooling(true);

        }
        else {
          this.router.navigate(["/start"]);
        }
       
      });
    }
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
    const dialogRef = this.dialog.open(DialogSuccessfulAddedComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    
      });

    if (this.detailId > 0) {
      this.addOrEdit = "Schulung anlegen";
    }
    this.dataSource = [];
    this.table.renderRows();
    this.detailId = 0;
  }

  fillComboboxes() {
    this.backendService.getOrganizer()
      .subscribe(x => {
        console.log(x);
        this.organizer = x;
        const distinctArray = this.organizer.filter((n, i) => this.organizer.indexOf(n) === i);
        console.log(distinctArray);
      })
    this.backendService.getCategories().subscribe(x => this.category = x);
    
  }
  changeOrganizer() {
    console.log("changing");
    this.checkInputs();
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
        if (result != null) {
          if (this.newOrganizer != "") {
            console.log(this.newOrganizer);
            var org = new OrganizerDto(this.organizer.length, this.newOrganizer, "", "", "", "")
            this.organizer.push(org);
            this.organizerName.name = this.newOrganizer;
            this.backendService.postOrganizer(org).subscribe(x => console.log("org added"));
          }
        }
       

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
      if (result != null) {
        this.firstname = result.firstname;
        this.lastname = result.lastname;
        this.mail = result.mail;
        this.companyName = result.companyName;
        //this.companyName = result.name;
        //this.companyContactPerson = result.contactperson;
        //this.companyMail = result.mail;

        this.companys.push(this.companyName);
        this.addMember();
      }
    

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
    console.log(this.backendDto);
    this.street= this.backendDto.street;
    this.streetNumber = this.backendDto.streetNumber.toString();
    this.zipCode = this.backendDto.zipCode.toString();
    this.city = this.backendDto.city;
    this.country = this.backendDto.country;
    console.log(this.backendDto.name);

    //let arr = this.backendDto.name.split("+");
    //let cat = arr[1].replace(/\s/g, "");
    ////for (var i = 0; i < this.category.length; i++) {
      
    ////}
    
    this.catName = this.category.filter(x =>  x.name.startsWith(this.backendDto.name) )[0];
    console.log(this.catName);
   
    var xx = this.backendDto.start.toString().split("-");
    var day = xx[2].split("T");
    var hours = day[1].split(":");

    var xxE = this.backendDto.end.toString().split("-");
    var dayE = xxE[2].split("T");
    var hoursE = dayE[1].split(":")

    this.startDate = new Date();
    this.startDate.setFullYear(+xx[0], +xx[1] - 1, +day[0]);
    this.startDate.setHours(+hours[0], +hours[1]);

    this.endDate = new Date();
    this.endDate.setFullYear(+xxE[0], +xxE[1] - 1, +dayE[0]);
    this.endDate.setHours(+hoursE[0], +hoursE[1]);

    this.dateString = this.startDate.toDateString() + " - " + this.endDate.toDateString();
    let sT = new Date(this.backendDto.start);
    let eT = new Date(this.backendDto.end);
    this.convertToGermanTime(sT, eT);
    this.contactPerson = this.backendDto.contactPerson;

    this.organizerName = this.organizer.find(x => x.name === this.backendDto.organizer);
    console.log(this.organizerName);

    this.email = this.backendDto.email;
    this.phone = this.backendDto.phone;
    this.website = this.backendDto.website;
    this.price = this.backendDto.price;

    this.dataSource = this.backendDto.participants;
    this.sizeOfSchooling = this.backendDto.availablePlaces;
    this.contentLink = this.backendDto.contentLink;
    this.kurzbeschreibungHtml = this.backendDto.kurzbeschreibung;
    
  }
  getDetails() {
    this.getDetail(`https://localhost:5001/backend/schoolings/${this.detailId}`)
      .subscribe(data => {
        this.backendDto = data;
        this.fillDetails();
      });
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
    console.log("checks");
    this.saved = false;
    if (this.catName.name != "" && this.startDate != null, this.endDate != null, this.price != null, Number(this.zipCode) != null, this.city != null, this.street != null, Number(this.streetNumber) != null,
      this.country != null,  this.sizeOfSchooling != null) {
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
        this.startDate.setHours(this.startDate.getHours() + 1);
        this.endDate.setHours(this.endDate.getHours() + 1);
        this.postSchooling(new BackendDetailDto(10, this.catName.name, this.startDate, this.endDate, this.price, Number(this.zipCode), this.city, this.street, Number(this.streetNumber),
          this.country, this.organizerName.name, this.contactPerson, this.email, this.website, this.phone, true, this.dataSource, this.sizeOfSchooling, this.kurzbeschreibungHtml, this.contentLink))
          .subscribe(x => {
            console.log(x);
            if (goBack) {
              this.router.navigate(["/start"]);
            }



          });
      }
     
    }
  
    

   
  }
  editSchooling(goBack: boolean) {
 
    this.startDate.setHours(this.startDate.getHours() + 1);
    this.endDate.setHours(this.endDate.getHours() + 1);

    this.putSchooling(new BackendDetailDto(10, this.catName.name, this.startDate, this.endDate, this.price, Number(this.zipCode), this.city, this.street, Number(this.streetNumber),
      this.country, this.organizerName.name, this.contactPerson, this.email, this.website, this.phone, true, this.dataSource, this.sizeOfSchooling, this.kurzbeschreibungHtml, this.contentLink))
      .subscribe(x => {
        console.log(x);
        if (goBack) {
          this.router.navigate(["/start"]);
        }


      });


  }
  changeTime(typ: boolean) {
    console.log(typ);
    if (typ) {
      this.startDate.setHours(+this.startTime.split(":")[0], +this.startTime.split(":")[1]);

    }
    else {
      this.endDate.setHours(+this.endTime.split(":")[0], +this.endTime.split(":")[1]);
    }
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


  addMember() {
    console.log(this.firstname);
    this.dataSource.push(new CompanyMember(this.dataSource.length + 1, this.firstname, this.lastname, this.mail, this.companyName, this.companyContactPerson, this.companyMail));
    this.dataSource = this.dataSource.map(x => Object.assign({}, x));
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
  addCategory() {
    const dialogRef = this.dialog.open(DialogAddCategoryComponent, {
      width: '600px',
      data: { org: this.newCategory, newContentLink: this.newContentLink }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      if (result != null) {
        if (this.newCategory != "") {
          const categ = new CategoryDto(result.org, result.newContentLink);
     
          this.category.push(categ);
          this.backendService.postCategory(categ).subscribe(x=> console.log("post category"));
          //this.catName = this.newCategory;
        }
      }


    });
  }
  editCategory() {
    const dialogRef = this.dialog.open(DialogEditOrgCatComponent, {
      width: '600px',
      data: { org: this.catName.name, isCategory: true, editLink: this.contentLink }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      if (result != null) {
        
          console.log(this.newCategory);
        var index = this.category.indexOf(this.catName);
        console.log(index);
        this.catName.contentLink = result.editLink;
        this.catName.name = result.org;
        this.category[index] = this.catName;
        this.backendService.putCategory(this.catName).subscribe(x => console.log("put category"));
        this.contentLink = this.catName.contentLink;
        
          
        
      }


    });
  }
  editOrganizer() {
    const dialogRef = this.dialog.open(DialogEditOrgCatComponent, {
      width: '600px',
      data: { org: this.organizerName.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.newOrganizer = result.org;
      if (result != null) {
        if (this.newOrganizer != "") {
          console.log(this.newOrganizer);

          var index = this.organizer.indexOf(this.organizerName);
          this.organizerName.name = this.newOrganizer;
          this.backendService.putOrganizer(this.organizerName);
          //console.log(this.category[index]);

        }
      }


    });
  }
  categoryChanged() {
    this.checkInputs();
    this.contentLink = this.catName.contentLink;

  }
 
}
