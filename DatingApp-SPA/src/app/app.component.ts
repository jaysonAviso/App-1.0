import { Component, OnInit, Output } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { take } from 'rxjs/operators';
import { LoginUser } from './_models/loginUser';
import { User } from './_models/user';
import { AlertifyService } from './_services/alertify.service';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "Dating App"
  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService) {}


  ngOnInit() {
    this.setCurrentUser();
  }
  setCurrentUser() {
    const user: LoginUser = JSON.parse(localStorage.getItem('user'));
    // this.authService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    this.authService.setCurrentUser(user);
  }
}
