import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticatedGuard } from '../core/guards/authenticated-guard.guard';

const routes: Routes = [
  { path: 'user', canActivate: [AuthenticatedGuard], component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }

