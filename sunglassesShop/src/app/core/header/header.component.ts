import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { SunglassesService } from 'src/app/sunglasses/sunglasses.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private authenticationService: AuthenticationService,
    private sunglassesService: SunglassesService,
    private router: Router
  ) { }

  get isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated
  }

  logout() {
    this.authenticationService.logout().subscribe({
      next: example => {
        this.router.navigate(['/catalog'])
      },
      error: (responseError: HttpErrorResponse) => {
        // Когато съм logged и рестартирам server-a. Като вляза на страница, която прави заявка се получава грешката.
        // Да тествам дали работи оптимално.
        if (responseError.error.message === 'Invalid access token') {
          this.authenticationService.clearLocalStorage()
        } else {
          alert(responseError.error.message)
        }
      }
    })
  }
}
