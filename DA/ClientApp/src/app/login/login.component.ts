import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginUser } from './LoginUser';

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
    let user = new LoginUser(this.username, this.password);
    this.postUser(user)
      .subscribe(data => {
        this.isCorrect = data;
        console.log(this.isCorrect);
        if (this.isCorrect) {
          this.router.navigate(["/start"]);
        }
      });
   
   


  }
  postUser(reg: LoginUser): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    return this.http.post<string>(`https://localhost:5001/backend/login`, reg, httpOptions);
  }

  private getLogin(url: string): Observable<string> {
    return this.http.get<string>(url);

  }
}
