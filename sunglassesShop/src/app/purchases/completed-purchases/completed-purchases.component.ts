import { Component, OnInit } from '@angular/core';
import { PurchasesService } from '../purchases.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Purchase } from 'src/app/shared/types/purchase';
import { User } from 'src/app/shared/types/user';

@Component({
  selector: 'app-completed-purchases',
  templateUrl: './completed-purchases.component.html',
  styleUrls: ['./completed-purchases.component.css']
})
export class CompletedPurchasesComponent implements OnInit {
  isCompletedPurchases: boolean = false
  completedPurchases: Purchase[] = []
  user: User | undefined

  constructor(
    private purchasesService: PurchasesService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.purchasesService.getCompletePurchases().subscribe({
      next: currentCompletedPurchases => {
        if (currentCompletedPurchases.length === 0) {
          this.isCompletedPurchases = false
        } else {
          this.isCompletedPurchases = true
          this.completedPurchases = currentCompletedPurchases
          this.user = this.authenticationService.getUser()
          console.log(this.completedPurchases)
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

  completeOrderHandler(sunglasses: Purchase) {
    const confirm = window.confirm(`Are you sure you want to delete ${sunglasses.sunglassesDetails.brand} ${sunglasses.sunglassesDetails.model}?`);
    if (confirm) {
      const id = sunglasses._id

      this.purchasesService.deleteCompletedPurchase(id).subscribe({
        next: completedOrder => {
          this.completedPurchases = this.completedPurchases.filter(purchase => {
            return purchase._id !== id
          })

          if(this.completedPurchases.length === 0){
            this.isCompletedPurchases = false
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
}
