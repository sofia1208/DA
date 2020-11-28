import { Component, OnInit, Input } from '@angular/core';
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
  displayedColumns: string[] = ['index','name', 'company', 'email', 'signiture'];
  constructor() { }

  ngOnInit(): void {
  }

}
