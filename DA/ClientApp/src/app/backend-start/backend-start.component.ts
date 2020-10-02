import { Component, OnInit, ViewChild } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { SummaryDto } from './SummaryDto';
import { SchoolingDto } from '../calendar/SchoolingDto';
import { MatTable, MatCheckbox } from '@angular/material';
@Component({
  selector: 'app-backend-start',
  templateUrl: './backend-start.component.html',
  styleUrls: ['./backend-start.component.css']
})
export class BackendStartComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  schoolings: SummaryDto[] = [];
  dataSource: SummaryDto[] = [];
  selection: string;
  constructor(private http: HttpClient, private router: Router) {
  }
  
  ngOnInit() {
   this.getSum();
  }

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
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "id": 0
      }
    };
    this.router.navigate(["/detail"], navigationExtras
    );
  }
  displayedColumns: string[] = ['name', 'date', 'check', 'edit', 'delete'];
 

  fillTable(): void {
    for (var i = 0; i < this.schoolings.length; i++) {
      this.dataSource.push(this.schoolings[i]);
      
      this.table.renderRows();
    }

  }
  tableKeydown(event: KeyboardEvent) {
    if (event.ctrlKey) {
      console.log("Hallo");
      console.log(event.key);
    }
    console.log("no");
  }
  deleteSchooling(id: number) {

    let item = this.dataSource.find(x => x.id == id);
    const index: number = this.dataSource.indexOf(item);
    if (index !== -1) {
      this.dataSource.splice(index, 1);
    }
    this.table.renderRows();
  
    this.delete(`https://localhost:5001/backend/summary/${id}`, id)
      .subscribe(data => {
        console.log(data); 
     
      }
      );
   
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
  checkBox(id: Number) {
    let index = this.dataSource.find(x => x.id == id);
    let display = index.display;
    this.changeDisplay(`https://localhost:5001/backend/updatedisplay/${id}`, !display)
      .subscribe(x=> console.log(x));
    

  }
  private delete(url:string, id: number): Observable<{}> {
   
    return this.http.delete(url);
      
  }
  private getSummary(url: string): Observable<SummaryDto[]> {
    return this.http.get<SummaryDto[]>(url);

  }
  private changeDisplay(url: string, value: boolean): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.put<string>(url, value, httpOptions);

  }
 

}
