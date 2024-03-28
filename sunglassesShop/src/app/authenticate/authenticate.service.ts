import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared/types/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  constructor(private http: HttpClient) { }

  getUserInfo(): Observable<User> {
    return this.http
      .get<User>('/api/users/me')

  }
}
