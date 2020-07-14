import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  schoolings: SchoolingGet[] = [];
  events: CustomEvent[] = [];
  holidays: HolidayAPI[] = [];
  constructor(private http: HttpClient) { }

  
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

  viewDate: Date = new Date();


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
    //TO DO Jahr dynamisch machen
    this.getHolidaysHTTP('https://getfestivo.com/v2/holidays?api_key=4995fde4f1b7998b6d7632886ede685a&country=AT&year=2020&language=de')
      .subscribe(data => {
     
        this.holidays = data;
      })
  
  }


  getGrundlagen(): void {
    console.log(this.holidays);
    console.log(this.holidays.length);
    //this.schoolings = [];
    //this.events = [];
    //this.getSchoolings('https://localhost:5001/schoolings/summary/grundlagen')
    //  .subscribe(data => {
    //    this.schoolings = data;
    //    this.schoolingsToEvents();

    //  }
    //    , err => {
    //      console.log(`${err.message}`)
    //    })
    //  ;
    //this.schoolingsToEvents();

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

 
 
  //events: Schooling[] = [
  //  {
  //    start: subDays(startOfDay(new Date()), 1),
  //    end: addDays(new Date(), 1),
  //    title: 'moveIT@SSQ Grundlagen',
  //    color: colors.red,
     
  //    allDay: true,
  //    resizable: {
  //      beforeStart: true,
  //      afterEnd: true,
       
  //    },
  //    draggable: true,
  //    isFree: false,
    
  //  },
  //  {
  //    start: startOfDay(new Date()),
  //    title: 'moveIT@SSQ Grundlagen',
  //    color: colors.green,
  //    isFree: true,
   
  //  },
  //  {
  //    start: subDays(endOfMonth(new Date()), 3),
  //    end: addDays(endOfMonth(new Date()), 3),
  //    title: 'moveIT@SSQ Grundlagens',
  //    color: colors.green,
  //    allDay: true,
  //    isFree: false,
  //  },
  //  {
  //    start: addHours(startOfDay(new Date()), 2),
  //    end: addHours(new Date(), 2),
  //    title: 'moveIT@SSQ Grundlagen',
  //    color: colors.red,
   
  //    resizable: {
  //      beforeStart: true,
  //      afterEnd: true,
  //    },
  //    draggable: true,
  //    isFree: true,
  //  },
  //];
  clickOnEvent(id :number): void {
     //TODO:bei Event eine ID mitgeben,  get Request mit ID
}

  activeDayIsOpen: boolean = false;

 

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    //if (isSameMonth(date, this.viewDate)) {
    //  if (
    //    (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
    //    events.length === 0
    //  ) {
    //    this.activeDayIsOpen = false;
    //  } else {
    //    this.activeDayIsOpen = true;
    //  }
    //  this.viewDate = date;
    //}
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
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
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
        isHoliday:false,
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

  private getSchoolings(url: string): Observable<SchoolingGet[]> {
    return this.http.get<SchoolingGet[]>(url);
   
  }
  private getHolidaysHTTP(url: string): Observable<HolidayAPI[]> {
    return this.http.get<HolidayAPI[]>(url);

  }
  private schoolingsToEvents(): void {
    var ret: CustomEvent[] = [] ;
    for (var i = 0; i < this.schoolings.length; i++) {
     
      const schooling: CustomEvent = {
        isFree: true,
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        title: this.schoolings[i].name,
        id: i,
        isHoliday: false,
      };
     
      
      this.events.push(schooling);
      this.refresh.next();
      
      
    }
 
  
  }
  private holidaysToEvents(): void {


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



