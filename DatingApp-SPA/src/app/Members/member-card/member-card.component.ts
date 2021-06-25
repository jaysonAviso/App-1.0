import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/_services/user.service';
import { User } from '../../_models/user';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  addLike(user: User) {
    this.userService.addLike(user.username).subscribe(() => {
      this.toastr.success(`You Have Like ${user.knownAs}`);
    }, error => {
      this.toastr.error(error);
    })
  }

}
