import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private validator: FormBuilder) { }

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
    console.log(this.registerForm.value);
  }

  cancel() {
    console.log('cancelled')
  }

}
