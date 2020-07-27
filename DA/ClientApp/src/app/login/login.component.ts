import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  isCorrect: string = "false";
  constructor(private http: HttpClient, private router: Router) { }
 
  hide = true;
  ngOnInit() {
  }
  submit() {
    console.log(this.username + " " + this.password);
    this.getLogin(`https://localhost:5001/backend/login/${this.username}/${this.password}`)
      .subscribe(data => {
        this.isCorrect = data;
        console.log(this.isCorrect);
        if (this.isCorrect) {
          this.router.navigate(["/start"]);
        }
      });
   
   


  }
  private getLogin(url: string): Observable<string> {
    return this.http.get<string>(url);

  }
}
