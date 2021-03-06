import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { SchoolingDto } from '../calendar/SchoolingDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnChanges {
  @Input() id: Number;
  @Input() detailTitle: string;
  @Output() fPlaces = new EventEmitter<string>();
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  preis: string = '';
  organisator: string = '';
  kontaktperson: string = '';
  telefon: string = '';
  adresse: string = '';


  calendar: boolean = true;
  detailId: Number;
  canReg: boolean = false;
  activeWorkshop: boolean = false;
  activeAvailable: boolean = false;
  activeKombi: boolean = false;
  activeGrundlagen: boolean = false;
  activeAdmin: boolean = false;
  listactive: string = "seas";
  freePlaces: string;
  kurzbeschreibung: string;
  contentLink: string;
  schooling: SchoolingDto;
  maxPlaces: string;
  canLogin: boolean = true;
 
  constructor(private http: HttpClient, private router: Router) { }

  ngOnChanges(): void {
    console.log("detailView on changes");
    //console.log(this.schoolingDto);
    //this.fillDetails(this.schoolingDto);
    console.log(this.id);
    this.getSchooling();
  }
  ngOnInit() {
    //console.log(this.schoolingDto);
    //this.fillDetails(this.schoolingDto);
    console.log(this.id);
    if (this.router.url.includes('/registration')) {
      this.canLogin = false;
    }
    this.getSchooling();
  }
  fillDetails(schooling: SchoolingDto) {
    console.log(schooling);
    this.telefon = schooling.phone;
    this.convertToGermanTime(schooling);
    this.preis = schooling.price.toString() + " €";
    this.organisator = schooling.organizer;
    this.kontaktperson = schooling.contactPerson;
    this.startDate = new Date(schooling.start);
    this.endDate = new Date(schooling.end);
    this.adresse = schooling.street + " " + schooling.streetNumber + " " + schooling.zipCode + " " + schooling.city + ", " + schooling.country;
    this.freePlaces = "" + schooling.freePlaces;
    this.contentLink = schooling.contentLink;
    this.kurzbeschreibung = schooling.kurzbechreibung;
    console.log(this.freePlaces);
    this.maxPlaces = schooling.maxPlaces;
    this.getPlaces();
  

  }
  getPlaces() {
    this.fPlaces.emit(this.freePlaces);
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
  goToHyperLink() {

    window.open(this.contentLink, '_blank');
  }
  scrollToDetail() {
  //  this.myScrollContainer.nativeElement.scrollIntoView({ block: "end", behavior: "smooth" });
  }
  getSchooling() {
    this.getDetail(`https://localhost:5001/schoolings/details/${this.id}`)
      .subscribe(data => {
        var schooling = data;
        console.log(data);
        if (schooling.freePlaces == 0 &&! this.detailTitle.includes("(Diese Schulung ist belegt)")) {
          this.detailTitle = this.detailTitle + "   (Diese Schulung ist belegt)";
          this.canLogin = false;
        }

        this.fillDetails(schooling);

      })
    this.fillDetails(this.schooling);
 
  }
  goToRegistration(): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "id": this.id,
        "title": this.detailTitle
      }
    };
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/registration'], navigationExtras)
    );

    window.open(url, '_blank');

  }
       private getDetail(url: string): Observable < SchoolingDto > {
      return this.http.get<SchoolingDto>(url);

    }

}
