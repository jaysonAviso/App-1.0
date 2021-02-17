import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from '../../_models/user';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  images = [];

  constructor(private userService: UserService, private alertify: AlertifyService,
    private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.images = this.getImages();
  }

  getImages() {
    const imageUrls = [];
    for(let i =0; i < this.user.photos.length; i++) {
      imageUrls.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description: this.user.photos[i].description
      });
    } 
    return imageUrls;
  }
}
