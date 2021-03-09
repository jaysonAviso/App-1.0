import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  users: User[] = [];
  paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
  
  constructor(private http: HttpClient) {}

  getUsers(page?: number, itemsPerPge?: number) {
    let params = new HttpParams();
    if(page !== null && itemsPerPge !== null){
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPge.toString());
    }
    return this.http.get<User[]>(`${this.baseUrl}users`, {observe: 'response', params}).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if(response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;
      })
    );
  }

  getUser(username) {
    const user = this.users.find(x => x.username === username);
    if(user !== undefined) return of(user);
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
