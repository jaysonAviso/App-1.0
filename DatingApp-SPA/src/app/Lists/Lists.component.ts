import { Component, OnInit } from '@angular/core';
import { Pagination } from '../_models/pagination';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-Lists',
  templateUrl: './Lists.component.html',
  styleUrls: ['./Lists.component.css']
})
export class ListsComponent implements OnInit {
  users: Partial<User[]>
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 6;
  pagination: Pagination; 

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadLikes();
  }

  loadLikes() {
    this.userService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe(response => {
      this.users = response.result;
      this.pagination = response.pagination;
    });
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadLikes();
  }

}
