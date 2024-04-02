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

  constructor(
    private authenticationService: AuthenticationService,
    private authenticateService: AuthenticateService) { }

  get isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated
  }

  ngOnInit(): void {
    if (this.isAuthenticated) {
      this.subscription = this.authenticateService.getUserInfo().subscribe()
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
