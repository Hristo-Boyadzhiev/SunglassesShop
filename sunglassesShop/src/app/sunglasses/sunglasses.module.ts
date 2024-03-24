import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { SunglassesRoutingModule } from './sunglasses-routing.module';
import { CatalogComponent } from './catalog/catalog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DetailsComponent } from './details/details.component';



@NgModule({
  declarations: [
    CreateComponent,
    CatalogComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    SunglassesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class SunglassesModule { }
