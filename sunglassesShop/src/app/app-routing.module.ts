import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(module => module.AuthenticationModule) },
  { path: 'message', loadChildren: () => import('./message/message.module').then(module => module.MessageModule) },
  { path: 'purchases', loadChildren: () => import('./purchases/purchases.module').then(module => module.PurchasesModule) },
  { path: 'sunglasses', loadChildren: () => import('./sunglasses/sunglasses.module').then(module => module.SunglassesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
