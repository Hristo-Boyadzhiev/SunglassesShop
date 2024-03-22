import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailsComponent } from './details/details.component';
import { DetailsResolver } from './details/details.resolver';

const routes: Routes = [
{path: 'create', component: CreateComponent},
{path: 'catalog', children: [
  {path: '', pathMatch: 'full', component: CatalogComponent},
  {path: 'details/:sunglassesId', resolve: {sunglassesId: DetailsResolver} ,component: DetailsComponent}

]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SunglassesRoutingModule { }

