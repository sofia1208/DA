import { Component, OnInit, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { SummaryDto } from './SummaryDto';
import { SchoolingDto } from '../calendar/SchoolingDto';
import { MatTable } from '@angular/material';
@Component({
  selector: 'app-backend-start',
  templateUrl: './backend-start.component.html',
  styleUrls: ['./backend-start.component.css']
})
export class BackendStartComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  schoolings: SummaryDto[] = [];
  dataSource: SummaryDto[] = [];
  constructor(private http: HttpClient, private router: Router) {
  }
  
  ngOnInit() {
   this.getSum();
  }
  //GEt auf Summary (checkbox)
  //GET auf Detail/ID (neues)
  //DELETE Summary (id)

  //bei edit-> GET detail -> speichern PUT (variable)
  // speichern nur teilnehmer bzw löschen

  //POST für neuen EIntrag
  getSum() {
    
    this.getSummary(`https://localhost:5001/backend/summary`)
      .subscribe(data => {
       
        this.schoolings = data;
        console.log(this.schoolings);
        this.fillTable();
      });




  }
  newSchooling() {
    
    this.router.navigate(["/detail"]);
  }
  displayedColumns: string[] = ['name', 'date', 'check', 'edit', 'delete'];
 

  fillTable(): void {
    for (var i = 0; i < this.schoolings.length; i++) {
      this.dataSource.push(this.schoolings[i]);
      this.table.renderRows();
    }

  }
  deleteSchooling(id: number) {
    //delete render rows bei subscribe
    console.log(id);
    this.delete(`https://localhost:5001/backend/summary/10`, 10)
      .subscribe();
    this.table.renderRows();
  }
  editSchooling(id: Number) {
    console.log(id);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "id": id
      }
    };
    this.router.navigate(["/detail"], navigationExtras);
  
  }
  private delete(url:string, id: number): Observable<{}> {
   
    return this.http.delete(url);
      
  }
  private getSummary(url: string): Observable<SummaryDto[]> {
    return this.http.get<SummaryDto[]>(url);

  }
 

}
