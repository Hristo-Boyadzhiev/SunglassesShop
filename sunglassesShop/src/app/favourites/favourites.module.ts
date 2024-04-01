import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouritesSunglassesCatalogComponent } from './favourites-sunglasses-catalog/favourites-sunglasses-catalog.component';
import { FavouritesRoutingModule } from './favourites-router.module';



@NgModule({
  declarations: [
    FavouritesSunglassesCatalogComponent
  ],
  imports: [
    CommonModule,
    FavouritesRoutingModule
  ]
})
export class FavouritesModule { }
