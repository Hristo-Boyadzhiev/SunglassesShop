import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { PurchasesService } from '../purchases.service';
import { Purchase } from 'src/app/shared/types/purchase';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { DeliveryCostPipe } from 'src/app/shared/pipes/delivery-cost.pipe';
import { Router } from '@angular/router';
import { Sunglasses } from 'src/app/shared/types/sunglasses';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
  providers: [DeliveryCostPipe]
})
export class BasketComponent implements OnInit {
  buyerId: string | undefined
  purchasesList: Purchase[] = []
  isEmptyCollection: boolean = true
  total: number = 0
  deliveryCost: number = 0
  paymentAmount: number = 0
  isCompletedOrder: boolean = false

  constructor(
    private authenticationService: AuthenticationService,
    private purchasesService: PurchasesService,
    private deliveryCostPipe: DeliveryCostPipe,
    private router: Router
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
            this.total = this.purchasesList.reduce((acc, purchase) => acc + purchase.totalPrice, 0)
            this.deliveryCost = this.deliveryCostPipe.transform(this.total, 100);
            this.paymentAmount = this.total + this.deliveryCost
          }
        },
        error: (responseError: HttpErrorResponse) => {
          // Когато съм logged и рестартирам server-a. Като вляза на страница, която прави заявка се получава грешката.
          // Да тествам дали работи оптимално.
          if (responseError.error.message === 'Invalid access token') {
            this.authenticationService.clearLocalStorage()
          } else if(responseError.status === 404){
            this.isEmptyCollection = true
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
      alert('The quantity must be positive number')
      return;
    }

    // При всяка промяна на количеството се прави put request и да променя quantity
    const { quantity } = form.value
    const id = sunglasses._id
    const sunglassesWithEditedQuantity = { ...sunglasses, quantity: Number(quantity), totalPrice: Number(quantity) * sunglasses.sunglassesDetails.price }

    this.purchasesService.editPurchaseQuantity(id, sunglassesWithEditedQuantity).subscribe({
      next: editedSunglasses => {
        this.purchasesList = this.purchasesList.map(purchase => {
          return purchase._id === editedSunglasses._id
            ? editedSunglasses
            : purchase
        })

        this.total = this.purchasesList.reduce((acc, purchase) => acc + purchase.totalPrice, 0)
        this.deliveryCost = this.deliveryCostPipe.transform(this.total, 100);
        this.paymentAmount = this.total + this.deliveryCost
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

  deleteSunglasses(sunglasses: Purchase) {
    const confirm = window.confirm(`Are you sure you want to delete ${sunglasses.sunglassesDetails.brand} ${sunglasses.sunglassesDetails.model}?`);
    if (confirm) {
      const id = sunglasses._id

      this.purchasesService.deletePurchase(id).subscribe({
        next: deletedPurchase => {
          this.purchasesList = this.purchasesList.filter(purchase => {
            return purchase._id !== id
          })

          if (this.purchasesList.length === 0) {
            this.isEmptyCollection = true
          } else {
            this.total = this.purchasesList.reduce((acc, purchase) => acc + purchase.totalPrice, 0)
            this.deliveryCost = this.deliveryCostPipe.transform(this.total, 100);
            this.paymentAmount = this.total + this.deliveryCost
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

  completeOrderHandler() {
    this.isCompletedOrder = !this.isCompletedOrder

    this.purchasesService.transfortUserPurchaseInCompletedPurchase()

    setTimeout(() => {
      this.router.navigate(['/catalog'])
    }, 3000);
  }

}
