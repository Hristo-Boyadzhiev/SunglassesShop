import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { PurchasesService } from '../purchases.service';
import { Purchase } from 'src/app/shared/types/purchase';
import { NgForm } from '@angular/forms';
import { DeliveryCostPipe } from 'src/app/shared/pipes/delivery-cost.pipe';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
  providers: [DeliveryCostPipe]
})
export class BasketComponent implements OnInit, OnDestroy {
  isLoading: boolean = true
  purchasesList: Purchase[] = []
  isEmptyCollection: boolean = true
  total: number = 0
  deliveryCost: number = 0
  paymentAmount: number = 0
  isCompletedOrder: boolean = false
  subscriptions: Subscription[] = []
  errorMessage: string = ''

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
      const buyerId = this.authenticationService.getUser()?._id
      const searchQuery = encodeURIComponent(`buyerId="${buyerId}"`)

      const subscription = this.purchasesService.getUserPurchases(searchQuery).subscribe({
        next: currentUserPurchases => {
          this.isLoading = false
          if (currentUserPurchases.length === 0) {
            this.isEmptyCollection = true
          } else {
            this.isEmptyCollection = false
            this.purchasesList = currentUserPurchases
            this.total = this.purchasesList.reduce((acc, purchase) => acc + purchase.totalPrice, 0)
            this.deliveryCost = this.deliveryCostPipe.transform(this.total, 100);
            this.paymentAmount = this.total + this.deliveryCost
          }
        }
      })
      this.subscriptions.push(subscription)
  }

  quantityHandler(form: NgForm, sunglasses: Purchase) {
    if (form.invalid) {
      this.errorMessage = 'The quantity must be positive number'
      return;
    }

    // При всяка промяна на количеството се прави put request и да променя quantity
    const { quantity } = form.value
    const id = sunglasses._id
    const sunglassesWithEditedQuantity = { ...sunglasses, quantity: Number(quantity), totalPrice: Number(quantity) * sunglasses.sunglassesDetails.price }

    const subscription = this.purchasesService.editPurchaseQuantity(id, sunglassesWithEditedQuantity).subscribe({
      next: editedSunglasses => {
        this.purchasesList = this.purchasesList.map(purchase => {
          return purchase._id === editedSunglasses._id
            ? editedSunglasses
            : purchase
        })

        this.total = this.purchasesList.reduce((acc, purchase) => acc + purchase.totalPrice, 0)
        this.deliveryCost = this.deliveryCostPipe.transform(this.total, 100);
        this.paymentAmount = this.total + this.deliveryCost
      }
    })
    this.subscriptions.push(subscription)
  }

  deleteSunglasses(sunglasses: Purchase) {
    const confirm = window.confirm(`Are you sure you want to delete ${sunglasses.sunglassesDetails.brand} ${sunglasses.sunglassesDetails.model}?`);
    if (confirm) {
      const id = sunglasses._id

      const subscription = this.purchasesService.deletePurchase(id).subscribe({
        next: () => {
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
        }
      })
      this.subscriptions.push(subscription)
    }
  }

  completeOrderHandler() {
    this.isCompletedOrder = !this.isCompletedOrder

    this.purchasesService.transfortUserPurchaseInCompletedPurchase()

    setTimeout(() => {
      this.router.navigate(['/sunglasses/catalog'])
    }, 3000);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}
