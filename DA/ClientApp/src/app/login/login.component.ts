import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
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
  loading:boolean= false;
  submitted = false;
  returnUrl: string;

  refresh: Subject<any> = new Subject();
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
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
        
          if (data) {
            this.router.navigate(['/start']);
          }
          else {
            this.loading = true;    
          }
         
        },
        error => {
        
          this.loading = true;
        });
  }

 
}
