import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { CategoryDto } from '../backend-detail/CategoryDto';
import { CompanyMember } from '../backend-detail/CompanyMember';
import { Member } from '../registration/Member';

@Component({
  selector: 'app-print-member',
  templateUrl: './print-member.component.html',
  styleUrls: ['./print-member.component.css']
})
export class PrintMemberComponent implements OnInit, OnChanges {
  @Input() category: string;
  @Input() sDate: Date;
  @Input() eDate: Date;
  @Input() dataSource: CompanyMember[] = [];
  myDataSource: CompanyMember[] = [];
  displayedColumns: string[] = ['index','name', 'company', 'email', 'signiture'];
  constructor() { }
   
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.dataSource.currentValue);
    console.log("PM: " + this.dataSource);
    this.myDataSource = this.dataSource;
    console.log(this.myDataSource);
    const length = 10 - this.dataSource.length;
  //  for (let i = 0; i < length; i++) {
  //    this.myDataSource.push(Object.create(null));
  //}

  }
  ngOnInit() {
    console.log("PM: " + this.dataSource);
    this.myDataSource = this.dataSource;
  }

}
