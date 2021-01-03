import { CalendarDateFormatter, DateFormatterParams, getWeekViewPeriod } from 'angular-calendar';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';


export class CustomDateFormatter extends CalendarDateFormatter {
 

  public dayViewHour({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'HH:mm', locale);
  }

  public weekViewHour({ date, locale }: DateFormatterParams): string {
    return this.dayViewHour({ date, locale });
  }

  public dayViewTitle({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'dd. MMMM yyyy', locale);
  }

  public weekViewTitle({ date, locale }: DateFormatterParams): string {
   
    const { viewStart, viewEnd } = getWeekViewPeriod(
      this.dateAdapter,
      date,
      1,
      [],
      0
    );
   
    console.log( this.dateAdapter.startOfWeek(date, {weekStartsOn: 1}));
    const format = (dateToFormat: Date, showYear: boolean) =>
      new Intl.DateTimeFormat(locale, {
       
        month: 'short',
        day: 'numeric',
        year: showYear ? 'numeric' : undefined,
      }).format(dateToFormat);

    return `${format(
      viewStart,
      viewStart.getUTCFullYear() !== viewEnd.getUTCFullYear()
    )} - ${format(viewEnd, true)}`;
   
  }
}
