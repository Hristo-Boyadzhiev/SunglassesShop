import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavouritesSunglassesCatalogComponent } from './favourites-sunglasses-catalog/favourites-sunglasses-catalog.component';
import { AuthenticatedGuard } from '../core/guards/authenticated-guard.guard';

const routes: Routes = [
  {path: 'sunglasses',canActivate:[AuthenticatedGuard], component: FavouritesSunglassesCatalogComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavouritesRoutingModule { }

