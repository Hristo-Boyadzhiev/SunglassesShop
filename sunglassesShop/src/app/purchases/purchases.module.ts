import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket/basket.component';
import { PurchasesRoutingModule } from './purchases-routing.module';



@NgModule({
  declarations: [
    BasketComponent
  ],
  imports: [
    CommonModule,
    PurchasesRoutingModule,
  ]
})
export class PurchasesModule { }
