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
  schooling: GetSummaryForPrint[] = [];
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
        console.log(data);

        this.schooling = data;
        console.log(this.schooling);
        this.schoolingToPrint();

      }
        , err => {
          console.log(`${err.message}`)
        });
    this.schoolingToPrint();

    console.log(this.events.length);
  }
  private getSchoolings(url: string): Observable<GetSummaryForPrint[]> {
    return this.http.get<GetSummaryForPrint[]>(url);

  }
  
  private schoolingToPrint(): void {
    for (var i = 0; i < this.schooling.length; i++) {

      this.events.push(this.schooling[i]);
      console.log(this.events);
    }
    //for (var i = 0; i < this.schooling.length; i++) {
    //  let start = new Date(this.schooling[i].startDate);
    //  let end = new Date(this.schooling[i].endDate);
      
    //   let schooling = new GetSummaryForPrint(this.schooling[i].name, this.schooling[i].)
    //const schooling: GetSummaryForPrint = {

    //  startDate: start,
    //  endDate: end,
    //  type: this.schooling[i].name,
    //  city: this.schoolingDto[i].city,
    //  organizer: this.schoolingDto[i].organizer,
    //  price: this.schoolingDto[i].price
    //};


    //this.events.push(schooling);
    //console.log(schooling);


    this.table.renderRows();


  }
      


  }
 

