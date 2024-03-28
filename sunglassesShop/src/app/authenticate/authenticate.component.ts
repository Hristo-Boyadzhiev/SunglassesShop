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
  // В процес на аутентикация
  isInAuthenticationProcess: boolean = false

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
          // Аутентикацията приключи
          this.isInAuthenticationProcess = false
        },
        // complete: () => {
        //   // Аутентикацията приключи
        //   this.isInAuthenticationProcess = false
        // }
      })
    }
  }
}
