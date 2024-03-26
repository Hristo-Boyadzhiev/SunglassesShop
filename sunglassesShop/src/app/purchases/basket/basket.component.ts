import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { PurchasesService } from '../purchases.service';
import { Purchase } from 'src/app/shared/types/purchase';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  buyerId: string | undefined
  purchasesList: Purchase[] = []
  isEmptyCollection: boolean = true

  constructor(
    private authenticationService: AuthenticationService,
    private purchasesService: PurchasesService
  ) { }

  get isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated
  }

  ngOnInit(): void {
    if (this.authenticationService.getUser()) {
      this.buyerId = this.authenticationService.getUser()?._id
      const searchQuery = encodeURIComponent(`buyerId="${this.buyerId}"`)

      this.purchasesService.getUserPurchases(searchQuery).subscribe({
        next: currentUserPurchases => {
          if (currentUserPurchases.length === 0) {
            this.isEmptyCollection = true
          } else {
            this.isEmptyCollection = false
            this.purchasesList = currentUserPurchases
            // console.log(currentUserPurchases)
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
    } else {
      alert('You are not authenticated. Please log-in')
    }
  }

  quantityHandler(form: NgForm, sunglasses: Purchase) {
    if (form.invalid) {
      console.log('invalid form')
      return
    }

    // При всяка промяна на количеството се прави put request и да променя quantity
    const { quantity } = form.value
    const id = sunglasses._id
    const sunglassesWithEditedQuantity = { ...sunglasses, quantity: Number(quantity) }

    this.purchasesService.editPurchaseQuantity(id, sunglassesWithEditedQuantity).subscribe({
      next: editedSunglasses => {
        // console.log(editedSunglasses)
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
