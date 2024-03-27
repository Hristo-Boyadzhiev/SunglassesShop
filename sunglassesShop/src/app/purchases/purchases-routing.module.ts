import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { CompletedPurchasesComponent } from './completed-purchases/completed-purchases.component';


const routes: Routes = [
{path: 'basket', component: BasketComponent},
{path: 'completedPurchases', component: CompletedPurchasesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasesRoutingModule { }

