import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AuthService } from 'src/app/_services/auth.service';
import { environment } from 'src/environments/environment';
import { Photo } from 'src/app/_models/photo';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';
import { LoginUser } from 'src/app/_models/loginUser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {
  @Input() user: User;
  uploader:FileUploader;
  hasBaseDropZoneOver:boolean = false;
  baseUrl = environment.apiUrl;
  currentMain: Photo;
  LoginUser: LoginUser;

  constructor(private authService: AuthService,
    private userService: UserService, private toastr: ToastrService) { }
  

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => this.LoginUser = user)
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
   this.uploader = new FileUploader({
     url: this.baseUrl + 'users/add-photo',
     authToken: 'Bearer ' + this.LoginUser.token,
     isHTML5: true,
     allowedFileType: ['image'],
     removeAfterUpload: true,
     autoUpload: false,
     maxFileSize: 10 * 1024 * 1024
   }); 

   this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false};

   this.uploader.onSuccessItem = (item, response, status, headers) => {
     if(response) {
       const res: Photo = JSON.parse(response);
       console.log(res)
       const photo = {
         id: res.id,
         url: res.url,
         dateAdded: res.dateAdded,
         description: res.description,
         isMain: res.isMain
       }

       this.user.photos.push(photo);
     }
   }
  }

  setMainPhoto(photo: Photo) {
    return this.userService.setMainPhoto(photo.id).subscribe(() => {
      this.user.photoUrl = photo.url;
      this.currentMain = this.user.photos.filter(p => p.isMain == true)[0];
      this.currentMain.isMain = false;
      photo.isMain = true;
    }, error => this.toastr.error(error));
  }

  deletePhoto(photoId: number) {
    this.userService.deletePhoto(photoId).subscribe(() => {
      this.user.photos = this.user.photos.filter(x => x.id !== photoId);
    })
  }
}
