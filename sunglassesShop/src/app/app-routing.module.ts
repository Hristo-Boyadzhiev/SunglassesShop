import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(module => module.AuthenticationModule) },
  { path: 'messages', loadChildren: () => import('./messages/messages.module').then(module => module.MessagesModule) },
  { path: 'purchases', loadChildren: () => import('./purchases/purchases.module').then(module => module.PurchasesModule) },
  { path: 'sunglasses', loadChildren: () => import('./sunglasses/sunglasses.module').then(module => module.SunglassesModule) },
  { path: 'favourites', loadChildren: () => import('./favourites/favourites.module').then(module => module.FavouritesModule) },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(module => module.ProfileModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
