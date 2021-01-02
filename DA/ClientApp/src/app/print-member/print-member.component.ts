import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { CategoryDto } from '../backend-detail/CategoryDto';
import { Member } from '../registration/Member';

@Component({
  selector: 'app-print-member',
  templateUrl: './print-member.component.html',
  styleUrls: ['./print-member.component.css']
})
export class PrintMemberComponent implements OnInit {
  @Input() category: string;
  @Input() sDate: Date;
  @Input() eDate: Date;
  @Input() dataSource: Member[] = [];
  myDataSource: Member[] = [];
  displayedColumns: string[] = ['index','name', 'company', 'email', 'signiture'];
  constructor() { }

  ngOnInit(): void {
    this.myDataSource = this.dataSource;
    console.log(this.myDataSource);
    const length = 10 - this.dataSource.length;
  //  for (let i = 0; i < length; i++) {
  //    this.myDataSource.push(Object.create(null));
  //}

}

}
