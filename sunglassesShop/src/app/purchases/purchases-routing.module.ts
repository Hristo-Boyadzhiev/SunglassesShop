import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { CompletedPurchasesComponent } from './completed-purchases/completed-purchases.component';
import { AdminGuard } from '../core/guards/admin-guard.guard';
import { AuthenticatedGuard } from '../core/guards/authenticated-guard.guard';


const routes: Routes = [
  { path: 'basket', canActivate: [AuthenticatedGuard], component: BasketComponent },
  { path: 'completedPurchases',canActivate:[AdminGuard], component: CompletedPurchasesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasesRoutingModule { }

