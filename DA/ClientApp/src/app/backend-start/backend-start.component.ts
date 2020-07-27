import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SummaryDto } from './SummaryDto';
@Component({
  selector: 'app-backend-start',
  templateUrl: './backend-start.component.html',
  styleUrls: ['./backend-start.component.css']
})
export class BackendStartComponent implements OnInit {

  schoolings: SummaryDto[] = [];
  constructor(private http: HttpClient, private router: Router) { }
  
  ngOnInit() {
  //  this.getSummary();
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
      });




  }
  newSchooling() {

  }
  displayedColumns: string[] = ['name', 'date', 'check', 'edit', 'delete'];
  fillTable() {
  }
  private getSummary(url: string): Observable<SummaryDto[]> {
    return this.http.get<SummaryDto[]>(url);

  }
 

}
