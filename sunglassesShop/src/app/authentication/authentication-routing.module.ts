import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GuestGuard } from '../core/guards/guest-guard.guard';

const routes: Routes = [
  { path: 'login',canActivate:[GuestGuard], component: LoginComponent },
  { path: 'register',canActivate:[GuestGuard], component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }

