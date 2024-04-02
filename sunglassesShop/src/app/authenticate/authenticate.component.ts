import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticateService } from './authenticate.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined
  // В процес на аутентикация
  // isInAuthenticationProcess: boolean = false

  constructor(
    private authenticationService: AuthenticationService,
    private authenticateService: AuthenticateService) { }

  get isToken(): boolean {
    return this.authenticationService.isAuthenticated
  }

  ngOnInit(): void {
    if (this.isToken) {

      // this.isInAuthenticationProcess = true

      this.subscription = this.authenticateService.getUserInfo().subscribe({
        next: currentUser => {
          // Аутентикацията приключи
          // this.isInAuthenticationProcess = false
        },
        // complete: () => {
        //   // Аутентикацията приключи
        //   this.isInAuthenticationProcess = false
        // }
      })
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
