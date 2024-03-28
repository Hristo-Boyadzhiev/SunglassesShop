import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from './authenticate.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {
  isAuthenticationCompleted: boolean = true

  constructor(
    private authenticationService: AuthenticationService,
    private authenticateService: AuthenticateService) { }

  get isToken(): boolean {
    return this.authenticationService.isAuthenticated
  }

  ngOnInit(): void {
    if (this.isToken) {

      this.authenticateService.getUserInfo().subscribe({
        next: currentUser => {
          // console.log(currentUser)
          this.isAuthenticationCompleted= true
        },
        error: (responseError: HttpErrorResponse) => {
          if (responseError.error.message === 'Invalid access token') {
            this.authenticationService.clearLocalStorage()
          } else {
            alert(responseError.error.message)
          }
          this.isAuthenticationCompleted= true
        }
      })
    } 
  }
}
