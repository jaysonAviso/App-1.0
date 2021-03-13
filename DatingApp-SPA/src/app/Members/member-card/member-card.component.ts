import { Component, Input, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from '../../_models/user';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;

  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  addLike(user: User) {
    this.userService.addLike(user.username).subscribe(() => {
      this.alertify.success(`You Have Like ${user.knownAs}`);
    }, error => {
      this.alertify.error(error);
    })
  }

}
