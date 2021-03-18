import { HttpClient, HttpParams } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginUser } from '../_models/loginUser';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';
import { UserParams } from '../_models/userParams';
import { AuthService } from './auth.service';
import { getPaginatedResult, getPaginationHeader } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  users: User[] = [];
  user: LoginUser;
  userParams: UserParams;
  userCache = new Map();

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user,
      this.userParams = new UserParams(user);
    })
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }
  resetUserParams() {
    return this.userParams = new UserParams(this.user);
  }

  getUsers(userParams: UserParams) {
    var response = this.userCache.get(Object.values(userParams).join('-'));
    if(response) return of(response);

    let params = getPaginationHeader(userParams.pageNumber, userParams.pageSize);
    
    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return getPaginatedResult<User[]>(`${this.baseUrl}users`, params, this.http)
    .pipe(map(response => {
      this.userCache.set(Object.values(userParams).join('-'), response);
      return response;
    }));
  }

  getUser(username) {
    const user = [...this.userCache.values()]
      .reduce((arr,elem) => arr.concat(elem.result), [])
      .find((user: User) => user.username === username);
  
    if(user) return of(user);

    return this.http.get<User>(`${this.baseUrl}users/${username}`);
  }

  updateUser(username: string, user: User) {
    return this.http.put(`${this.baseUrl}users/${username}`, user).pipe(
      map(()=> {
        const index = this.users.indexOf(user);
        this.users[index] = user;
      })
    );
  }
  setMainPhoto(photoId: number) {
    return this.http.post(`${this.baseUrl}users/setMain/${photoId}`,{});
  }
  deletePhoto(photoId: number) {
    return this.http.delete(`${this.baseUrl}users/delete-photo/${photoId}`)
  }
  addLike(username: string) {
    return this.http.post(`${this.baseUrl}likes/${username}`, {});
  }
  getLikes(predicate: string, pageNumber: number, pageSize: number) {
    let params = getPaginationHeader(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    return getPaginatedResult<Partial<User[]>>(`${this.baseUrl}likes`, params, this.http);
  }

}
