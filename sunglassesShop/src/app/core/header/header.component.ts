import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

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

  // Да помисля дали има и по-умен и с по-красив начин начин 
  get user() {
    const user = this.authenticationService.getUser()
    if (user) {
      return user
    } else {
      return undefined
    }
  }

  logout() {
    this.authenticationService.logout().subscribe({
      next: example => {
        this.router.navigate(['/catalog'])
      }
    })
  }
}
