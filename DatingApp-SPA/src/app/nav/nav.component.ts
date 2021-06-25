import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private validator: FormBuilder, public authservice: AuthService,
    private toastr: ToastrService, private router: Router) {
    }

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
      this.toastr.success('Logged in successfully')
    }, error => {
      this.toastr.error(error);
    }, () => {
      this.router.navigate(['/members']);
    })
  }

  logout() {
    this.authservice.logout();
    this.toastr.show('logged out');
    this.router.navigate(['/home']);
  }
  
}
