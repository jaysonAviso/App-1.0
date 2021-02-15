import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  @Output() cancelRegister = new EventEmitter();

  constructor(private validator: FormBuilder, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = this.validator.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  isValidInput(fieldName): boolean {
    return this.registerForm.controls[fieldName].invalid &&
      (this.registerForm.controls[fieldName].dirty || this.registerForm.controls[fieldName].touched);
}

  register() {
    this.authService.register(this.registerForm.value).subscribe(() =>{
      this.alertify.success('registration successful');
    }, error => {
       this.alertify.error(error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.alertify.message('cancelled')
  }

}
