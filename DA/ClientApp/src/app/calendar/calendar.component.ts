import { Component, OnInit, ViewEncapsulation, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';

import {

  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  
} from 'date-fns';

import { Subject } from 'rxjs';

import {
  CalendarEvent,
  CalendarEventAction,
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
import { element } from 'protractor';
import { SchoolingDto } from './SchoolingDto';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
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
 @ViewChild('modalContent', { static: false }) modalContent: TemplateRef<any>;

  schoolings: SchoolingGet[] = [];
  events: CustomEvent[] = [];
  holidayApis: HolidayAPI[] = [];
  holidays: Holiday[] = [];

  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  preis: string = '';
  organisator: string = '';
  kontaktperson: string = '';
  telefon: string = '';
  adresse: string = '';




  constructor(private http: HttpClient) { }
  ngAfterViewInit(): void {
 
    }
 
  
  ngOnInit() {
    console.log('ngOnInit');
    this.getSummary();
    this.getHolidays();
    

  }

  
  locale: string = 'de';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  view: CalendarView = CalendarView.Day;
  
  CalendarView = CalendarView;
  @ViewChildren("detailView") detailView: QueryList<any>
  //TO-DO scrollen
  viewDate: Date = new Date();
  detailTitle: string = '';
  hidden: boolean = true;

  modalData: {
    action: string;
    event: CalendarEvent;
  };
 
  getSummary(): void {
  
    this.getSchoolings('https://localhost:5001/schoolings/summary')
      .subscribe(data => {
        this.schoolings = data;
        this.schoolingsToEvents();
       
      }
       , err => {
          console.log(`${err.message}`)
        });
    this.schoolingsToEvents();
   
    console.log(this.schoolings.length);
  }
  onDateClick(): void {
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

 
 
  

  clickOnEvent(event: CustomEvent): void {
    this.hidden = false;
 
      let schooling = new SchoolingDto;
    let id = event.id;
    if (event.isHoliday) {

    }
    else {
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


  activeDayIsOpen: boolean = false;

  fillDetails(schooling: SchoolingDto) {
    
    this.telefon = schooling.phone;
    this.startTime = new Date(schooling.start).getHours() + ":" + new Date(schooling.start).getMinutes();
    this.endTime = new Date(schooling.end).getHours() + ":" + new Date(schooling.start).getMinutes();
    this.preis = schooling.price.toString() + " €";
    this.organisator = schooling.organizer;
    this.kontaktperson = schooling.contactPerson;
   
    this.startDate = new Date(schooling.start);
    this.endDate = new Date(schooling.end);
    this.adresse = schooling.street + " " + schooling.streetNumber + " " + schooling.zipCode + " " + schooling.city + ", " + schooling.country;
    this.refresh.next();
  }
  
  dayClicked({ date, events }: { date: Date; events: CustomEvent[] }): void {
    // TO-DO: Bei mehreren Events an einem Tag?
    this.detailTitle = events[0].title;
    let event = events[0];
    this.clickOnEvent(event);
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
          isFree: true,
          isHoliday: false,

          hasMoreDays: false,
        };
      }
      return iEvent;
    });
   
  }

  handleEvent(action: string, event: CustomEvent): void {
    console.log(event.id);
    this.detailTitle = event.title;
    this.clickOnEvent(event);
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        isFree: true,
        isHoliday: false,
        hasMoreDays: false,
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
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
  
      if (start.getDay() != end.getDay()) {
        moreDays = true;
      }

      console.log(this.schoolings)
      const schooling: CustomEvent = {
        isFree: true,
        start: startOfDay(start),
        end: endOfDay(end),
        title: this.schoolings[i].name,
        id: this.schoolings[i].id,
        allDay: true,
        isHoliday: false,
        hasMoreDays: moreDays,
      

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
      const holiday: CustomEvent = {
        isFree: true,
        start: startOfDay(this.holidays[i].date),
        end: endOfDay(this.holidays[i].date),
        title: this.holidays[i].name,
        id: this.events.length,
        allDay: true,
        isHoliday: true,
        hasMoreDays: false,


      };
      this.events.push(holiday);
      this.refresh.next();
          
    }
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



