import { Component, OnDestroy, OnInit } from '@angular/core';
import { PurchasesService } from '../purchases.service';
import { Purchase } from 'src/app/shared/types/purchase';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-completed-purchases',
  templateUrl: './completed-purchases.component.html',
  styleUrls: ['./completed-purchases.component.css']
})
export class CompletedPurchasesComponent implements OnInit, OnDestroy {
  isLoading: boolean = true
  isCompletedPurchases: boolean = false
  completedPurchases: Purchase[] = []
  subscription: Subscription | undefined

  constructor(
    private purchasesService: PurchasesService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.purchasesService.getCompletePurchases().subscribe({
      next: currentCompletedPurchases => {
        this.isLoading = false
        if (currentCompletedPurchases.length === 0) {
          this.isCompletedPurchases = false
        } else {
          this.isCompletedPurchases = true
          this.completedPurchases = currentCompletedPurchases
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
