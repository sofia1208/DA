import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {CustomEvent} from '../calendar/CustomEvent'
import { SchoolingGet } from '../calendar/SchoolingGet';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatTable } from '@angular/material';
import { GetSummaryForPrint } from './GetSummaryForPrint'
import { SchoolingDto } from '../calendar/SchoolingDto';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor(private http: HttpClient) { }
  @Input()
  events: GetSummaryForPrint[] = [];
  schooling: SchoolingGet[] = [];
  schoolingDto: SchoolingDto;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  ngOnInit() {
    console.log(this.events.length);

    this.getSummary();
  }
  displayedColumns: string[] = ['type', 'city', 'date', 'price', 'organisation'];

  getSummary(): void {

    this.getSchoolings('https://localhost:5001/schoolings/summary')
      .subscribe(data => {
        this.schooling = data;
        this.schoolingsToEvents();

      }
        , err => {
          console.log(`${err.message}`)
        });
    this.schoolingsToEvents();

    console.log(this.events.length);
  }
  private getSchoolings(url: string): Observable<SchoolingGet[]> {
    return this.http.get<SchoolingGet[]>(url);

  }
  
  private schoolingsToEvents(): void {
    
    for (var i = 0; i < this.schooling.length; i++) {
      let start = new Date(this.schooling[i].start);
      let end = new Date(this.schooling[i].end);
      
      
    const schooling: GetSummaryForPrint = {

      startDate: start,
      endDate: end,
      type: this.schooling[i].name,
      city: this.schoolingDto.city,
      organizer: this.schoolingDto.organizer,
      price: this.schoolingDto.price
    };


    this.events.push(schooling);
    console.log(schooling);


    this.table.renderRows();


  }
      


  }
  bindToDTO() {
   
   
  }
  private getDetail(url: string): Observable<SchoolingDto> {
    return this.http.get<SchoolingDto>(url);

  }
}
