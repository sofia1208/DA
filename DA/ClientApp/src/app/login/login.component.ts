import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginUser } from './LoginUser';
import { MatButton, MatInput } from '@angular/material';
import { AuthenticationService } from './AuthService';
import { first } from 'rxjs/internal/operators/first';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
 
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  hide = true;
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
        
          this.loading = false;
        });
  }

  submit() {
 
    //let user = new LoginUser(this.user, this.password);
    //this.postUser(user)
    //  .subscribe(data => {
    
    //    if (data.toString()==="true") {
         
    //      this.isCorrect = true;
    //      this.router.navigate(["/start"]);
    //    }
       
       
    //    else {
    //      this.password = "";
    //      this.loginFail = true;
    //    }
    //  });
   
  


  }
  isLoggedIn() {
    return this.isCorrect;
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
