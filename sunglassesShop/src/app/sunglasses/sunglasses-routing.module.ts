import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { AdminGuard } from '../core/guards/admin-guard.guard';

const routes: Routes = [
  { path: 'create', canActivate: [AdminGuard], component: CreateComponent },
  {
    path: 'catalog', children: [
      { path: '', pathMatch: 'full', component: CatalogComponent },
      { path: ':sunglassesId', component: DetailsComponent },
      { path: ':sunglassesId/edit', canActivate: [AdminGuard], component: EditComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SunglassesRoutingModule { }

