import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from 'src/app/_models/pagination';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from '../../_models/user';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-MemberList',
  templateUrl: './MemberList.component.html',
  styleUrls: ['./MemberList.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 10;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.loadMembers();
    // this.route.data.subscribe(data => {
    //   this.users = data['users'];
    // })
  }

  loadMembers() {
    this.userService.getUsers(this.pageNumber, this.pageSize).subscribe(response => {
      this.users = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    console.log("triger");
    this.loadMembers();
  }
}
