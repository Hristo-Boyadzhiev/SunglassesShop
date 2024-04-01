import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavouritesSunglassesCatalogComponent } from './favourites-sunglasses-catalog/favourites-sunglasses-catalog.component';

const routes: Routes = [
  {path: 'sunglasses', component: FavouritesSunglassesCatalogComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavouritesRoutingModule { }

