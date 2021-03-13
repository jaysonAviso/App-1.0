import { Component, OnInit } from '@angular/core';
import { LoginUser } from 'src/app/_models/loginUser';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-MemberList',
  templateUrl: './MemberList.component.html',
  styleUrls: ['./MemberList.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  userParams: UserParams;
  user: LoginUser;
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}]

  constructor(private userService: UserService) {
    this.userParams = this.userService.getUserParams();
   }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.setUserParams(this.userParams);
    this.userService.getUsers(this.userParams).subscribe(response => {
      this.users = response.result;
      this.pagination = response.pagination;
    })
  }

  resetFilters() {
    this.userParams = this.userService.resetUserParams();
    this.loadUsers();
  }
  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.userService.setUserParams(this.userParams);
    this.loadUsers();
  }
}
