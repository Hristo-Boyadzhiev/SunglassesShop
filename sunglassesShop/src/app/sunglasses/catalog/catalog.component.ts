import { Component, OnInit } from '@angular/core';
import { SunglassesService } from '../sunglasses.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Sunglasses } from 'src/app/shared/types/sunglasses';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  isEmptyCollection: boolean = false
  emptyCollectionMessage: string = ''
  sunglassesCollection: Sunglasses[] = []

  constructor(
    private sunglassesService: SunglassesService,
    private authenticationService: AuthenticationService
  ) { }

  get isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated
  }

  ngOnInit(): void {
    this.sunglassesService.getSunglasses().subscribe({
      next: sunglasses => {
        console.log(sunglasses)
        this.sunglassesCollection = sunglasses
      },
      error: (responseError: HttpErrorResponse) => {
        // Когато съм logged и рестартирам server-a. Като вляза на страница, която прави заявка се получава грешката.
        // Да тествам дали работи оптимално.
        // При 'Invalid access token' в съчетание с status 404(липсват очила) не работи както трябва
        if (responseError.error.message === 'Invalid access token') {
          this.authenticationService.clearLocalStorage()
        } else {
          if (responseError.status === 404) {
            this.isEmptyCollection = true
            this.sunglassesCollection = []
            this.emptyCollectionMessage = 'No sunglasses yet'
          } else {
            alert(responseError.error.message)
          }
        }
      }
    })
  }
}
