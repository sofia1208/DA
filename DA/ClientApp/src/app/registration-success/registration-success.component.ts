import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-success',
  templateUrl: './registration-success.component.html',
  styleUrls: ['./registration-success.component.css']
})
export class RegistrationSuccessComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  backToCalendar() {
    this.router.navigate(["/calendar"]);
  }
}
