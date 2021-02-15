import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  loginForm: FormGroup;s
  constructor(private validator: FormBuilder, private authservice: AuthService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.validator.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isValidInput(fieldName): Boolean {
    return this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
  }

  login() {
    this.authservice.login(this.loginForm.value).subscribe(next=> {
      console.log('Logged in successfully')
    }, error => {
      console.log(error);
    })
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    console.log('logged out')
  }
  
}
