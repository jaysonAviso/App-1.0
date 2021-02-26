import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  registerMode: boolean = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  registerToggle(){
    this.registerMode = true;
  }
  
  cancelRegisterMode(registerMode: boolean){
    this.registerMode = registerMode;
  }
}
