import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sunglasses } from 'src/app/shared/types/sunglasses';
import { SunglassesService } from '../sunglasses.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { NgForm } from '@angular/forms';
import { PurchasesService } from 'src/app/purchases/purchases.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  sunglassesDetails: Sunglasses | undefined
  defaultQuantity = 1
  buyerId: string | undefined

  constructor(
    private activatedRoute: ActivatedRoute,
    private sunglassesService: SunglassesService,
    private authenticationService: AuthenticationService,
    private purchasesService: PurchasesService
  ) { }

  get isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['sunglassesId']

    this.sunglassesService.getSunglassesDetails(id).subscribe({
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
    this.buyerId = this.authenticationService.getUser()?._id
    const searchQuery = encodeURIComponent(`buyerId="${this.buyerId}"`)

    this.purchasesService.getUserPurchases(searchQuery).subscribe({
      next: currentUserPurchases => {
        const userPurchase = currentUserPurchases.find(purchase => {
          return purchase.sunglassesDetails._id === this.sunglassesDetails?._id
        })

        if (userPurchase) {
          const id = userPurchase._id
          const editQuantity = quantity + userPurchase.quantity
          const sunglassesWithEditedQuantity = { ...userPurchase, quantity: editQuantity, totalPrice: editQuantity * userPurchase.sunglassesDetails.price }

          this.purchasesService.editPurchaseQuantity(id, sunglassesWithEditedQuantity).subscribe({
            next: editedSunglasses => {
              console.log(editedSunglasses)
            }
            ,
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
        } else {
          if (this.sunglassesDetails && this.buyerId) {
            const totalPrice = quantity * this.sunglassesDetails.price
            this.sunglassesService.buySunglasses(quantity, totalPrice, this.sunglassesDetails, this.buyerId).subscribe({
              next: boughtSunglasses => {
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
          } else {
            alert('You are not authenticated. Please log-in')
          }
        }
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
