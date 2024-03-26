import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket/basket.component';
import { PurchasesRoutingModule } from './purchases-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BasketComponent
  ],
  imports: [
    CommonModule,
    PurchasesRoutingModule,
    FormsModule
  ]
})
export class PurchasesModule { }
