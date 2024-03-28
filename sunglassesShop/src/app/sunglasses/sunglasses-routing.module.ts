import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
{path: 'create', component: CreateComponent},
{path: 'catalog', children: [
  {path: '', pathMatch: 'full', component: CatalogComponent},
  {path: ':sunglassesId', component: DetailsComponent},
  {path: ':sunglassesId/edit', component: EditComponent}
]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SunglassesRoutingModule { }

