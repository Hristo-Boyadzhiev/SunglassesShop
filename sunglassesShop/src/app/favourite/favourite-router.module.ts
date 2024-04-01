import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavouriteSunglassesCatalogComponent } from './favourite-sunglasses-catalog/favourite-sunglasses-catalog.component';

const routes: Routes = [
  {path: 'sunglasses', component: FavouriteSunglassesCatalogComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavouriteRoutingModule { }

