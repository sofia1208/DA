import { Component, OnInit, ViewEncapsulation,  ViewChildren, QueryList, Input, ElementRef } from '@angular/core';

import {

  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  
} from 'date-fns';

import { Subject } from 'rxjs';

import {
  CalendarEvent,
 
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarDateFormatter,

  DAYS_OF_WEEK,
} from 'angular-calendar';
import { CustomDateFormatter } from './customdateformatter';
import { CustomEvent } from './CustomEvent';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SchoolingGet } from './SchoolingGet';
import { Holiday } from './Holiday';
import { HolidayAPI } from './HolidayAPI';

import { SchoolingDto } from './SchoolingDto';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { Router, NavigationExtras } from '@angular/router';
import { Printing } from './Printing';
import { GetSummaryForPrint } from '../invoice/GetSummaryForPrint';

import { MatTable, MatDialogConfig, MatDialog } from '@angular/material';
import { DialogMoreEventsComponent } from '../dialog-more-events/dialog-more-events.component';

 
registerLocaleData(localeDe, 'de');
enum MyCalendarView {List, Month, Week, Day}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css', '/angular-calendar.css'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
  
  
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
 // @ViewChild('modalContent') modalContent: TemplateRef<any>;
  @ViewChild('mytable', { static: true })private table: MatTable<any>;
  @ViewChild('detailView', { static: true }) private myScrollContainer: ElementRef;
  schoolings: SchoolingGet[] = [];
  events: CustomEvent[] = [];
  holidayApis: HolidayAPI[] = [];
  holidays: Holiday[] = [];
 
  summaryList: GetSummaryForPrint[] = [];

  mobile: boolean = false;

  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  preis: string = '';
  organisator: string = '';
  kontaktperson: string = '';
  telefon: string = '';
  adresse: string = '';

  schoolingList: GetSummaryForPrint[] = [];
  calendar: boolean=true;
  detailId: Number;
  canReg: boolean = false;
  activeWorkshop: boolean = false;
  activeAvailable: boolean = false;
  activeKombi: boolean = false;
  activeGrundlagen: boolean = false;
  activeAdmin: boolean = false;
  listactive: string="seas";
  freePlaces : string;
  kurzbeschreibung: string;
  contentLink: string;
  displayedColumns: string[] = ['type', 'city', 'date', 'price', 'organisation'];
    selectedId: Number;
  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog) { }
  ngAfterViewInit(): void {
      
    }
 
  
  ngOnInit() {
    console.log('ngOnInit');
    this.getSummary();
    this.getHolidays();
    this.getListSummary();
    this.checkSize();
  }
  ngOnChanges() {
    console.log("hello");
  }

  
  locale: string = 'de';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  CalendarView = CalendarView;
  view: CalendarView = CalendarView.Month;
  

 

  viewDate: Date = new Date();
  detailTitle: string = '';
  hidden: boolean = true;

  modalData: {
    action: string;
    event: CalendarEvent;
  };

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
  setButtonRight() {
    this.activeWorkshop= false;
    this.activeAvailable= false;
    this.activeKombi = false;
    this.activeGrundlagen = false;
    this.activeAdmin = false;
    this.getSummary();
  }
  getSummary(): void {
    this.deleteOldSchoolings();
    this.getSchoolings('https://localhost:5001/schoolings/summary')
      .subscribe(data => {
        console.log(data);
        this.schoolings = data;
        this.schoolingsToEvents();
       
      }
       , err => {
          console.log(`${err.message}`)
        });
    this.schoolingsToEvents();
   
    console.log(this.schoolings.length);
  }

  getAvailable(): void {
    if (!this.activeAvailable) {
      this.activeAvailable = true;
      this.deleteOldSchoolings();
    
      this.getSchoolings('https://localhost:5001/schoolings/summary/isfree')
        .subscribe(data => {
          this.schoolings = data;
          this.schoolingsToEvents();

        }
          , err => {
            console.log(`${err.message}`)
          })
        ;
      this.schoolingsToEvents();



      console.log(this.schoolings.length);
    }
    else {
      this.getSummary();
      this.activeAvailable = false;
    }
   

  }
  getHolidays(): void {
  
    let now = new Date().getFullYear();
    
    this.getHolidaysHTTP(`https://getfestivo.com/v2/holidays?api_key=4995fde4f1b7998b6d7632886ede685a&country=AT&year=${now}&language=de`)
      .subscribe(data => {

        this.holidayApis = data;
        this.holidaysToEvents();
   
      });
  }


  getGrundlagen(): void {
    if (!this.activeGrundlagen) {
      this.activeGrundlagen = true;
      this.deleteOldSchoolings();
      this.getSchoolings('https://localhost:5001/schoolings/summary/grundlagen')
        .subscribe(data => {
          this.schoolings = data;
          this.schoolingsToEvents();

        }
          , err => {
            console.log(`${err.message}`)
          })
        ;
      this.schoolingsToEvents();


    }
    else {
      this.getSummary();
      this.activeGrundlagen = false;
    }
    console.log(this.schoolings.length);

  }
  getWorkshop(): void {
    if (!this.activeWorkshop) {
      this.activeWorkshop = true;
      this.deleteOldSchoolings();
      this.getSchoolings('https://localhost:5001/schoolings/summary/workshop')
        .subscribe(data => {
          this.schoolings = data;
          this.schoolingsToEvents();

        }
          , err => {
            console.log(`${err.message}`)
          })
        ;
      this.schoolingsToEvents();


    }
    else {
      this.getSummary();
      this.activeWorkshop = false;
    }

  }
  getAdmin(): void {
    if (!this.activeAdmin) {
      this.activeAdmin = true;
      this.deleteOldSchoolings();
      this.getSchoolings('https://localhost:5001/schoolings/summary/administrator')
        .subscribe(data => {
          this.schoolings = data;
          this.schoolingsToEvents();

        }
          , err => {
            console.log(`${err.message}`)
          })
        ;
      this.schoolingsToEvents();


    }
    else {
      this.getSummary();
      this.activeAdmin = false;
    }

 
  }
  getKombimodell(): void {
    if (!this.activeKombi) {
      this.activeKombi = true;
      this.deleteOldSchoolings();
      this.getSchoolings('https://localhost:5001/schoolings/summary/kombimodell')
        .subscribe(data => {
          this.schoolings = data;
          this.schoolingsToEvents();

        }
          , err => {
            console.log(`${err.message}`)
          })
        ;
      this.schoolingsToEvents();


    }
    else {
      this.getSummary();
      this.activeKombi = false;
    }



  }
  deleteOldSchoolings() {
    this.schoolings = [];
    let newev = this.events.filter(x => x.isHoliday);
    this.events = newev;
  }
   
  refresh: Subject<any> = new Subject();

  goToRegistration(): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "id": this.detailId,
        "title": this.detailTitle
      }
    };
   

    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/registration'],navigationExtras)
    );

    window.open(url, '_blank');
  
  
  }
 
  goToRegistrationList(id: Number, title: string): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "id": id,
        "title": title
      }
    };
    this.router.navigate(["/registration"], navigationExtras);

  }


  clickOnEvent(event: CustomEvent): void {
 
 
    let schooling = new SchoolingDto;
    let id = event.id;
    this.detailId = Number(event.id);


    if (event.isHoliday ) {
      this.hidden = true;
    }
    else {
      this.hidden = false;
    
      this.getDetail(`https://localhost:5001/schoolings/details/${id}`)
        .subscribe(data => {
          schooling = data;
          console.log(data);

          this.fillDetails(schooling);
          if (!event.isFree) {
            this.canReg = true;
            this.detailTitle = this.detailTitle + "   (Diese Schulung ist belegt)";
          }
          else {
            this.canReg = false;
          }

        }
          , err => {
            console.log(`${err.message}`)
          })
        ;
    }
 
  }

  clickOnList(id: Number, name:string): void {
    
    this.detailId = id;
    this.detailTitle = name;
    let schooling = new SchoolingDto;
  
      this.hidden = false;
      this.scrollToDetail();
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

  activeDayIsOpen: boolean = false;

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
    this.kurzbeschreibung = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.At vero eos et ac";
    this.contentLink = `https://www.google.at`;
    this.refresh.next();
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
  scrollToDetail() {
    this.myScrollContainer.nativeElement.scrollIntoView({ block: "end", behavior: "smooth" });
  }
  dayClicked({ date, events }: { date: Date; events: CustomEvent[] }): void {
    // TO-DO: Bei mehreren Events an einem Tag?
    if (events.length > 1) {
      this.handleMoreThanOneEvent(events);
     
    }
    else {
      this.detailTitle = events[0].title;
      let event = events[0];
      this.clickOnEvent(event);
    }

  }

  handleMoreThanOneEvent(events: CustomEvent[]) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      events: events
    };
    dialogConfig.autoFocus = true;

     const dialogRef = this.dialog.open(DialogMoreEventsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
   
       this.selectedId= result.data;
      this.detailTitle = events.filter(x => x.id == this.selectedId)[0].title;
      let event = events.filter(x => x.id == this.selectedId)[0];
      this.clickOnEvent(event);


    });
  
  }


  handleEvent(action: string, event: CustomEvent): void {
    console.log(event.id);
    this.detailTitle = event.title;
    this.clickOnEvent(event);
  }


  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }
  setListView() {
    this.view = null;
    this.listactive = "activeList";
    this.hidden = true;
    this.calendar = false;
    console.log(this.view);
    
  }
  setView(view: CalendarView) {
    this.listactive = "";
    this.hidden = true;
    this.calendar = true;
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  printPage() {
   
    window.print();

  }

  private getDetail(url: string): Observable<SchoolingDto> {
    return this.http.get<SchoolingDto>(url);

  }

  private getSchoolings(url: string): Observable<SchoolingGet[]> {
    return this.http.get<SchoolingGet[]>(url);
   
  }
  private getHolidaysHTTP(url: string): Observable<HolidayAPI[]> {
    return this.http.get<HolidayAPI[]>(url);

  }
  private schoolingsToEvents(): void {

    for (var i = 0; i < this.schoolings.length; i++) {
      let start = new Date(this.schoolings[i].start);
      let end = new Date(this.schoolings[i].end);
      let moreDays = false;
 
      console.log(this.schoolings)
      const schooling: CustomEvent = {
        isFree: this.schoolings[i].isFree,
        start: start,
        end: end,
        title: this.schoolings[i].name,
        id: this.schoolings[i].id,
        allDay: false,
        isHoliday: false,
        hasMoreDays: moreDays,

        outOfMonth: false

      };
      var today = new Date();
      if ((schooling.end > today)) {
        this.events.push(schooling);
      }
     
      this.refresh.next();
      
      
    }
 
  
  }
  checkIfItsOutOfMonth(event) {
    console.log(event);
    return true;

  }
  private holidaysToEvents(): void {
    //let holi = JSON.parse(this.holidays.toString());

    let jsonObject = JSON.parse(JSON.stringify(this.holidayApis));

    let holidays = jsonObject.holidays;
    this.convertToGerman(holidays);
    this.createHolidayEvents();

  }
  private convertToGerman(hol: string []): void {
    

    this.http.get('assets/holidayGermanNames.csv', { responseType: 'text' })
      .subscribe(
        data => {
          console.log(data);
          let csvToRowArray = data.split("\n");
          for (let index = 0; index < csvToRowArray.length; index++) {
            let row = csvToRowArray[index].split(";");

            for (var i = 0; i < hol.length; i++) {
              let jsonObject = JSON.parse(JSON.stringify(hol[i]));
              if (row[0].match(jsonObject.name)) {
                this.holidays.push(new Holiday(row[1], new Date(jsonObject.date)));
              }
            }
           

         
          
          }
          this.createHolidayEvents();
        },
        error => {
          console.log(error);
        }
    );

    
  }
  

  private createHolidayEvents(): void {
    this.holidays = this.holidays.filter(
      (thing, i, arr) => arr.findIndex(t => t.name === thing.name) === i
    );
   
    for (var i = 0; i < this.holidays.length; i++) {
      let date = this.holidays[i].date;
      let outofMonth = false;
      
      console.log(this.viewDate.getMonth() + " " + date.getMonth());
      const holiday: CustomEvent = {
        isFree: true,
        start: startOfDay(this.holidays[i].date),
        end: endOfDay(this.holidays[i].date),
        title: this.holidays[i].name,
        id: this.events.length,
        allDay: true,
        isHoliday: true,
        hasMoreDays: false,
        outOfMonth: outofMonth

      };
      this.events.push(holiday);
      this.refresh.next();
          
    }
    
  }

  getListSummary(): void {

    this.getSchool('https://localhost:5001/schoolings/summary')
      .subscribe(data => {
    

        this.schoolingList = data;
       
        this.addSchoolingToList();

      }
        , err => {
          console.log(`${err.message}`)
        });


  }
  private getSchool(url: string): Observable<GetSummaryForPrint[]> {
    return this.http.get<GetSummaryForPrint[]>(url);

  }

  private addSchoolingToList(): void {
    for (var i = 0; i < this.schoolingList.length; i++) {

      this.summaryList.push(this.schoolingList[i]);
     
    }

    this.table.renderRows();

  }
  goToHyperLink() {
  
    window.open(this.contentLink , '_blank');
  }



}



const colors: any = {
  red: {
    primary: '#F28C8C',
    secondary: '#FAE3E3',
  },
  green: {
    primary: '#8CEE88',
    secondary: '#90ee90',
  },

  
};



