import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';


import { LoginUser } from './LoginUser';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<LoginUser>;
  public currentUser: Observable<LoginUser>;
  loggedIn: boolean = false;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<LoginUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoginUser {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.post<any>(`https://localhost:5001/backend/login`, { username, password }, httpOptions)
      .pipe(
        tap(
          data => {
        
            this.loggedIn = data;
            return data;
          }
        )
      );
      

  }
  isLogginIn() {
    return this.loggedIn;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
