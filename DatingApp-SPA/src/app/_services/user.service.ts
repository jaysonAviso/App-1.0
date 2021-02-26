import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(`${this.baseUrl}users`);
  }

  getUser(username) {
    return this.http.get<User>(`${this.baseUrl}users/${username}`);
  }

  updateUser(username: string, user: User) {
    return this.http.put(`${this.baseUrl}users/${username}`, user);
  }
  setMainPhoto(id: number) {
    return this.http.post(`${this.baseUrl}users/${id}/setMain`,{});
  }
  deletePhoto(photoId: number) {
    return this.http.delete(`${this.baseUrl}users/delete-photo/${photoId}`)
  }
}
