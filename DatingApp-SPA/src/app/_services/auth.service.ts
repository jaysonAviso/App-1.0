import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators'
import { LoginUser } from '../_models/loginUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  currentUserSource = new ReplaySubject<LoginUser>(1);
  currentUser$ = this.currentUserSource.asObservable();


constructor(private http: HttpClient) {}

login(model: any) {
   return this.http.post(`${this.baseUrl}login`, model).pipe(
     map((response: LoginUser) => {
       const user = response;
       if(user){
         this.setCurrentUser(user);
       }
      })
    );
  }

  register(model: any) {
    return this.http.post(`${this.baseUrl}register`, model);
  }

  setCurrentUser(user: LoginUser) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
