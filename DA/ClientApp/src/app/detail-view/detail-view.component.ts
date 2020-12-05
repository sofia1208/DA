import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SchoolingDto } from '../calendar/SchoolingDto';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnChanges {
  @Input() schoolingDto: SchoolingDto;
  @Input() detailTitle: string;
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
  constructor() { }

  ngOnChanges(): void {
    console.log("detailView on changes");
  
    this.fillDetails(this.schoolingDto);
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
    this.freePlaces = "" + schooling.freePlaces;
    this.contentLink = schooling.contentLink;
    this.kurzbeschreibung = schooling.kurzbeschreibung;
    //this.refresh.next();
    this.scrollToDetail();
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
    this.myScrollContainer.nativeElement.scrollIntoView({ block: "end", behavior: "smooth" });
  }
}
