import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy{
  subscription: Subscription | undefined

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  get isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated
  }

  get isAdmin(): boolean {
    return this.authenticationService.isAdmin
  }

  get user() {
    const user = this.authenticationService.getUser()
    if (user) {
      return user
    } else {
      return undefined
    }
  }

  logout() {
    this.subscription = this.authenticationService.logout().subscribe({
      next: example => {
        this.router.navigate(['/sunglasses/catalog'])
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
