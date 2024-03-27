import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket/basket.component';
import { PurchasesRoutingModule } from './purchases-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CompletedPurchasesComponent } from './completed-purchases/completed-purchases.component';



@NgModule({
  declarations: [
    BasketComponent,
    CompletedPurchasesComponent
  ],
  imports: [
    CommonModule,
    PurchasesRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class PurchasesModule { }
