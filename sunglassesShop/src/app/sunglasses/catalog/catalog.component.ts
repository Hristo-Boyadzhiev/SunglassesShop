import { Component, OnDestroy, OnInit } from '@angular/core';
import { SunglassesService } from '../sunglasses.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Sunglasses } from 'src/app/shared/types/sunglasses';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit, OnDestroy {
  isLoading: boolean = true
  isEmptyCollection: boolean = false
  sunglassesCollection: Sunglasses[] = []
  subscription: Subscription | undefined

  constructor(
    private sunglassesService: SunglassesService,
    private authenticationService: AuthenticationService
  ) { }

  get isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated
  }

  ngOnInit(): void {
    this.subscription = this.sunglassesService.getSunglasses().subscribe({
      next: sunglasses => {
        this.isLoading = false
        if (sunglasses.length === 0) {
          this.isEmptyCollection = true
        } else {
          this.isEmptyCollection = false
          this.sunglassesCollection = sunglasses
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
