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
   
    this.myDataSource = this.dataSource.map(x => Object.assign({}, x));
    console.log(this.myDataSource);
    const length = 10 - this.myDataSource.length;
    for (let i = 0; i < length; i++) {
      this.myDataSource.push(Object.create(null));
  }

  }
  ngOnInit() {
    this.myDataSource = this.dataSource.map(x => Object.assign({}, x));
    const length = 10 - this.myDataSource.length;
    for (let i = 0; i < length; i++) {
      this.myDataSource.push(Object.create(null));
    }
  }

}
