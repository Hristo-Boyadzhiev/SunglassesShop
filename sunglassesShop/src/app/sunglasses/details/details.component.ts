import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sunglasses } from 'src/app/shared/types/sunglasses';
import { SunglassesService } from '../sunglasses.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { NgForm } from '@angular/forms';
import { PurchasesService } from 'src/app/purchases/purchases.service';
import { User } from 'src/app/shared/types/user';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id: string = ''
  sunglassesDetails: Sunglasses | undefined
  defaultQuantity = 1
  user: User | undefined

  constructor(
    private activatedRoute: ActivatedRoute,
    private sunglassesService: SunglassesService,
    private authenticationService: AuthenticationService,
    private purchasesService: PurchasesService,
    private router: Router
  ) { }

  get isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['sunglassesId']

    this.sunglassesService.getSunglassesDetails(this.id).subscribe({
      next: currentSunglassesDetails => {
        this.sunglassesDetails = currentSunglassesDetails
      },
      error: (responseError: HttpErrorResponse) => {
        if (responseError.error.message === 'Invalid access token') {
          this.authenticationService.clearLocalStorage()
        } else {
          alert(responseError.error.message)
        }
      }
    })
  }

  buySunglassesHandler(form: NgForm) {
    if (form.invalid) {
      console.log('Invalid form')
      return
    }

    const { quantity } = form.value
    this.user = this.authenticationService.getUser()

    const buyerId = this.user?._id
    const buyerEmail = this.user?.email
    const searchQuery = encodeURIComponent(`buyerId="${buyerId}"`)

    this.purchasesService.getUserPurchases(searchQuery).subscribe({
      next: currentUserPurchases => {
        if (this.sunglassesDetails && buyerId && buyerEmail) {
          const userPurchase = this.purchasesService.findBoughtSunglases(this.sunglassesDetails)
          if (userPurchase) {
            const id = userPurchase._id
            const editQuantity = quantity + userPurchase.quantity
            const sunglassesWithEditedQuantity = { ...userPurchase, quantity: editQuantity, totalPrice: editQuantity * userPurchase.sunglassesDetails.price }
            this.purchasesService.subscribeEditPurchaseQuantity(id, sunglassesWithEditedQuantity)
          } else {
            const totalPrice = quantity * this.sunglassesDetails.price
            this.sunglassesService.subscribeBuySunglasses(quantity, totalPrice, this.sunglassesDetails, buyerEmail, buyerId)
          }
        }
      },
      error: (responseError: HttpErrorResponse) => {
        // Когато съм logged и рестартирам server-a. Като вляза на страница, която прави заявка се получава грешката.
        // Да тествам дали работи оптимално.
        if (responseError.error.message === 'Invalid access token') {
          this.authenticationService.clearLocalStorage()
        } else if (responseError.status === 404) {
          if (this.sunglassesDetails && buyerId && buyerEmail) {
            const totalPrice = quantity * this.sunglassesDetails.price
            this.sunglassesService.subscribeBuySunglasses(quantity, totalPrice, this.sunglassesDetails, buyerEmail, buyerId)
          }
        } else {
          alert(responseError.error.message)
        }
      }
    })
  }

  deleteSunglassesHandler(sunglasses: Sunglasses | undefined) {
    if (sunglasses) {
      const confirm = window.confirm(`Are you sure you want to delete ${sunglasses.brand} ${sunglasses.model}?`);
      if (confirm) {
        this.sunglassesService.deleteSunglasse(sunglasses._id).subscribe({
          next: deletedSunglasses => {
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
  }
}
