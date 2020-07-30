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

import { MatTable } from '@angular/material';
registerLocaleData(localeDe, 'de');

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

  displayedColumns: string[] = ['type', 'city', 'date', 'price', 'organisation'];
  constructor(private http: HttpClient,private router:Router) { }
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
  view: CalendarView = CalendarView.Day;
  
  CalendarView = CalendarView;
 

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

  getSummary(): void {
  
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
    this.schoolings = [];
    this.events = [];
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
  getHolidays(): void {
  
    let now = new Date().getFullYear();
   
    this.getHolidaysHTTP(`https://getfestivo.com/v2/holidays?api_key=4995fde4f1b7998b6d7632886ede685a&country=AT&year=${now}&language=de`)
      .subscribe(data => {

        this.holidayApis = data;
        this.holidaysToEvents();
   
      });

  
  
  
  }


  getGrundlagen(): void {
  
    this.schoolings = [];
    this.events = [];
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

   

    console.log(this.schoolings.length);

  }
  getWorkshop(): void {
    this.schoolings = [];
    this.events = [];
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

    console.log(this.schoolings.length);

  }
  getAdmin(): void {
    this.schoolings = [];
    this.events = [];
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
  
    console.log(this.schoolings.length);

  }
  getKombimodell(): void {
    this.schoolings = [];
    this.events = [];
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

    console.log(this.schoolings.length);

  }

   
  refresh: Subject<any> = new Subject();

  goToRegistration(): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "id": this.detailId,
        "title": this.detailTitle
      }
    };
    this.router.navigate(["/registration"], navigationExtras);
  
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
    if (event.isHoliday|| !event.isFree) {
      this.hidden = true;
    }
    else {
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
 
  }

  clickOnList(id: Number): void {


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
    this.refresh.next();
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
    this.myScrollContainer.nativeElement.scrollIntoView();
  }
  dayClicked({ date, events }: { date: Date; events: CustomEvent[] }): void {
    // TO-DO: Bei mehreren Events an einem Tag?
    this.detailTitle = events[0].title;
    let event = events[0];
    this.clickOnEvent(event);
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
    this.hidden = true;
    this.calendar = false;
  }
  setView(view: CalendarView) {
    this.hidden = true;
    this.calendar = true;
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  printPage() {
   
    window.print();
    //this.printService.printDoct('invoice', invoiceIds);
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
    var ret: CustomEvent[] = [] ;
    for (var i = 0; i < this.schoolings.length; i++) {
      let start = new Date(this.schoolings[i].start);
      let end = new Date(this.schoolings[i].end);
      let moreDays = false;
      let outofMonth = false;
      if (start.getDay() != end.getDay()) {
        moreDays = true;
      }
      if (start.getMonth() != this.viewDate.getMonth() || end.getMonth() != this.viewDate.getMonth() ) {
        outofMonth = true;
      }
      console.log(this.schoolings)
      const schooling: CustomEvent = {
        isFree: true,
        start: start,
        end: end,
        title: this.schoolings[i].name,
        id: this.schoolings[i].id,
        allDay: false,
        isHoliday: false,
        hasMoreDays: moreDays,

        outOfMonth: outofMonth

      };
     
      
      this.events.push(schooling);
      this.refresh.next();
      
      
    }
 
  
  }
  private holidaysToEvents(): void {
    //let holi = JSON.parse(this.holidays.toString());

    let jsonObject = JSON.parse(JSON.stringify(this.holidayApis));
    let holidays = jsonObject.holidays;
    console.log(holidays);
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
    for (var i = 0; i < this.holidays.length; i++) {
      let date = this.holidays[i].date;
      let outofMonth = false;
      if (date.getMonth() != this.viewDate.getMonth()) {
       
        outofMonth = true;
      }
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
       
        this.schoolingToPrint();

      }
        , err => {
          console.log(`${err.message}`)
        });
   // this.schoolingToPrint();

  }
  private getSchool(url: string): Observable<GetSummaryForPrint[]> {
    return this.http.get<GetSummaryForPrint[]>(url);

  }

  private schoolingToPrint(): void {
    for (var i = 0; i < this.schoolingList.length; i++) {

      this.summaryList.push(this.schoolingList[i]);
     
    }

    this.table.renderRows();

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



