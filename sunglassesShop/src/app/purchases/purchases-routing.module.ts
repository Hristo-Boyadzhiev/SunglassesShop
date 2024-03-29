import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { CompletedPurchasesComponent } from './completed-purchases/completed-purchases.component';
import { AuthenticationGuard } from '../core/guards/authentication-guard.guard';
import { AdminGuard } from '../core/guards/admin-guard.guard';


const routes: Routes = [
  { path: 'basket', canActivate: [AuthenticationGuard], component: BasketComponent },
  { path: 'completedPurchases',canActivate:[AdminGuard], component: CompletedPurchasesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasesRoutingModule { }

