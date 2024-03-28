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
        if (sunglasses.length === 0) {
          this.isEmptyCollection = true
        } else {
          this.isEmptyCollection = false
          this.sunglassesCollection = sunglasses
        }
      }
    })
  }
}
