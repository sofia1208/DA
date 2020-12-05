import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy ,NgZone } from '@angular/core';
import { SchoolingDto } from '../calendar/SchoolingDto';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomEvent } from '../calendar/CustomEvent';
import { CalendarComponent } from '../calendar/calendar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from './Member';
import { MatTable, MatDialog, MatDialogConfig, MatTableDataSource } from '@angular/material';
import { Registration } from './Registration';
import { AgmMap, MouseEvent, MapsAPILoader } from '@agm/core';
import { Location } from './Location';
import { DialogComponentComponent } from '../dialog-component/dialog-component.component';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';
import { DialogDeleteMemberComponent } from '../dialog-delete-member/dialog-delete-member.component';
import { DialogSavingComponent } from '../dialog-saving/dialog-saving.component';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { DialogErrorComponent } from '../dialog-error/dialog-error.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {
  private geocoder: any;
  @ViewChild(AgmMap, { static: true }) public agmMap: AgmMap;
  refresh: Subject<any> = new Subject();
  startDate: Date;
  endDate: Date;
  startTime: string='';
  endTime: string ='';
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
  freePlaces: number;
  kurzbeschreibung: string;
  mobile: boolean = false;
  contentLink: string;
  company: string= "";
  companyPhone: string = "";
  companyMail: string = "";
  companyStreet: string = "";
  companyStreetNumber: string ="";
  companyZipCode: string="";
  companyCity: string = "";
  companyCountry: string = "";
  companyContactPersonName: string = "";
  companyContactPersonTitle: string = "";
  locations: Location[]= [];
  lat: Number = 48.1505921;
  lon: Number = 14.0069141;

  markerLat: Number ;
  markerLng: Number;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  dataSource: Member[] = [];
  buttonActive: boolean = false;
  available: number;
  schooling: SchoolingDto;
  schoolingI: SchoolingDto;
  printReady: boolean = true;
  checkDatenschutz: boolean;
  checkStrono: boolean;
  onePart: boolean = true;
  dynamicRow: string = "150px";
  dynamicHeight: number = 150;
  saved: boolean = true;
  disableAdding: boolean = true;
  openData: boolean = false;
  openStorno: boolean = false;
  searchForAddress: string;
  private geoCoder;
 
  @ViewChild('search')
  public searchElementRef: ElementRef;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private apiloader: MapsAPILoader, public dialog: MatDialog, private ngZone: NgZone) {
    console.log("constructor");
    this.route.queryParams.subscribe(p => {
      this.detailId = p["id"];
      this.detailTitle = p["title"];
    })
    this.checkSize();
    console.log(this.mobile);

  }
  
  options: string[] = ['Österreich', 'Deutschland', 'Schweiz'];
  filteredOptions: Observable<string[]>;

  countryC = new FormControl('');


  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  emailFormControl2 = new FormControl('', [Validators.required, Validators.email]);
 
  titleOptions: string[] = ['Frau', 'Herr'];

  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'edit', 'delete'];
  ngOnInit(): void {
    this.filteredOptions = this.countryC.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filter(value))
    );

    console.log('on init registration');
    this.getEvent(this.detailId);
    
   
   
    
  }
  private filter(value: string): string[] {
  
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  checkMemberInput() {
    if (this.firstname != "" && this.lastname != "" && this.emailFormControl2.valid) this.disableAdding = false;
    else {
      this.disableAdding = true;
    }
  }


  editSchooling(id: number) {
    let member = this.dataSource.find(x => x.id == id);
    const dialogRef = this.dialog.open(DialogEditComponent, {
      width: '50%',
      data: {
        firstname: member.firstname,
        lastname: member.lastname,
        email: member.email
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != null) {
    
        member.firstname = result.firstname;
        member.lastname = result.lastname;
        member.email = result.email;
       
      }
      


    });
    

  }
  deleteSchooling(id: number) {
    let member = this.dataSource.find(x => x.id == id);
    const dialogRef = this.dialog.open(DialogDeleteMemberComponent, {
      width: '40%',
      data: {
       name: member.firstname + " " + member.lastname
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != null) {
        this.dataSource = this.dataSource.filter(item => item.id != id);
        this.freePlaces++;
        if (this.freePlaces > 0) this.disableAdding = false;

      }



    });

  }
  goBack() {
    if (this.saved) {
      console.log("everything saved");
      this.router.navigate(["/calendar"]);
    }
    else {
     
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
         // this.addSchooling(true);

        }
        else {
          this.router.navigate(["/calendar"]);
        }

      });
    }
  }
  changeStorno() {
    console.log(this.openStorno);
    if (!this.openStorno) {
      this.openDialog("Stornobedingungen");
    }
    this.openStorno = !this.openStorno;
    this.checkButton();
  }
  changeData() {
 

    if (!this.openData) {
      this.openDialog("Datenschutzbestimmungen");
      
    }
    this.openData = !this.openData;
    this.checkButton();
  }
  checkButton() {
    this.saved = false;
    if (this.checkDatenschutz && this.checkStrono && this.company!=="" && this.companyCity!=="" &&
      
      this.companyContactPersonName!=="" && 
   
      this.companyMail!=="" && 
      this.companyPhone!=="" && 
      this.companyStreet!=="" && 
      this.companyStreetNumber!="" &&
      this.companyZipCode !== ""
    ) {
      

      console.log("true");
      this.buttonActive = true;
    }
    else {
      this.buttonActive = false;
    }
  }
  noMembersAdded() {

      const dialogConfig = new MatDialogConfig();

      dialogConfig.autoFocus = true;

      this.dialog.open(DialogErrorComponent, dialogConfig);
    
  }
  planRoute() {
    var ad = this.adresse.split(",")[0];


    window.open(`https://www.google.at/maps/dir//${ad}`, '_blank');
  
  }

  openDialog(name: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      name: name
    };
    dialogConfig.autoFocus = true;

    this.dialog.open(DialogComponentComponent, dialogConfig);
  }
  printRegistration() {
    this.printReady = false;
    window.print();
  }
  checkSize() {
    let width = window.innerWidth;
    if (width <= 768) {
      this.mobile = true;
      console.log('mobile device detected')
    } else if (width > 768 && width <= 992) {
      this.mobile = true;
      console.log('tablet detected')
    } else {
      this.mobile = false;
      console.log('desktop detected')
    }
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
    console.log(schooling);
    this.schoolingI = schooling;
    //console.log(schooling);
 
    //this.telefon = schooling.phone;
    //this.convertToGermanTime(schooling);
    //this.preis = schooling.price + " €";
    //this.organisator = schooling.organizer;
    //this.kontaktperson = schooling.contactPerson;

    //this.startDate = new Date(schooling.start);
    //this.endDate = new Date(schooling.end);
    //this.freePlaces = schooling.freePlaces;
    
    
    //this.adresse = schooling.street + " " + schooling.streetNumber + " " + schooling.zipCode + " " + schooling.city + ", " + schooling.country;
    //this.contentLink = schooling.contentLink;
    //this.kurzbeschreibung = schooling.kurzbeschreibung;
     this.getAddress();
  
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

  getEvent(id: Number) {

    let promise = new Promise((resolve, reject) => {
      
      this.http.get(`https://localhost:5001/schoolings/details/${id}`)
        .toPromise()
        .then(
          res => {
            console.log(res);
            this.schooling =JSON.parse( JSON.stringify(res));
            this.fillDetails(this.schooling);
            resolve();
          }
        );
    });
   
    this.fillDetails(this.schooling);
   
    return promise;
  
    
  }

  addMember(): void {
       
  
    this.dataSource.push(new Member(this.dataSource.length+1 ,this.firstname, this.lastname, this.email, this.company));
    this.table.renderRows();
    this.firstname = "";
    this.lastname = "";
    this.email = "";
    this.onePart = false;
    this.dynamicHeight = this.dynamicHeight + 50;
    this.dynamicRow = this.dynamicHeight + "px";
    this.freePlaces--;
    if (this.freePlaces == 0) {
      this.disableAdding = true;
    }
    this.disableAdding = true;
    //this.emailFormControl2.set;
   
  }
  submit(): void {
    console.log("Submit registration");
    if (this.dataSource.length == 0) {
      this.noMembersAdded();
    }
    else {
      this.addCompanyToSchooling(new Registration(Number(this.detailId), this.company, this.companyPhone, this.companyMail, this.companyStreet, Number(this.companyStreetNumber), Number(this.companyZipCode), this.companyCity, this.companyCountry, this.dataSource, this.companyContactPersonTitle, this.companyContactPersonName))
        .subscribe(x => console.log(x));
      this.router.navigate(["/checkout"]);
    }
   
  }
  addCompanyToSchooling(reg: Registration): Observable<Registration> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    return this.http.post<Registration>(`https://localhost:5001/schoolings/registration`, reg, httpOptions);
  }

  
  

  private getCoordinates(url: string): Observable<Location[]> {
    return this.http.get<Location[]>(url);

  }
  goToHyperLink() {

    window.open(this.contentLink, '_blank');
  }
  

}
