import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../shared/types/user';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  key: string = 'auth'

  constructor(private http: HttpClient) { }

  getUser(): User | undefined {
    const localStorageUser = localStorage.getItem(this.key)
    if (localStorageUser) {
      return JSON.parse(localStorageUser)
    } else {
      return undefined
    }
  }

  clearLocalStorage(): void {
    localStorage.removeItem(this.key)
    this.getUser()
  }

  get isAuthenticated(): boolean {
    return !!this.getUser()
  }

  get isAdmin(): boolean {
    const user = this.getUser()
    if (user && user.email === 'hristo@abv.bg') {
      return true
    } else {
      return false
    }
  }

  register(user: User): Observable<User> {
    return this.http
      .post<User>('/api/users/register', user)
      .pipe(tap(currentUser => {
        localStorage.setItem(this.key, JSON.stringify(currentUser))
      })
      )
  }

  login(user: User): Observable<User> {
    return this.http
      .post<User>('/api/users/login', user)
      .pipe(tap(currentUser => {
        localStorage.setItem(this.key, JSON.stringify(currentUser))
      })
      )
  }

  logout() {
    return this.http
      .get('/api/users/logout', { observe: 'response' })
      .pipe(tap((response) => {
        if (response.status === 204 && !response.headers.has('Content-Type')) {
          localStorage.removeItem(this.key)
        } else {
          throw response
        }
      }))
  }

}

