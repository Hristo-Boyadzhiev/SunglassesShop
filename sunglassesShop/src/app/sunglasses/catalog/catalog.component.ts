import { Component, OnInit } from '@angular/core';
import { SunglassesService } from '../sunglasses.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  isEmptyCollection: boolean = false
  emptyCollectionMessage: string | undefined

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
      },
      error: (responseError: HttpErrorResponse) => {
        if (responseError.status === 404) {
          this.isEmptyCollection = true
          this.emptyCollectionMessage = 'No sunglasses yet'
        } else {
          alert(responseError.error.message)
        }
      }
    })
  }
}
