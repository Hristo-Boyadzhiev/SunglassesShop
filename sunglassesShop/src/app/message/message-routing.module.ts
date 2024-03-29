import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendMessageComponent } from './send-message/send-message.component';
import { AuthenticationGuard } from '../core/guards/authentication-guard.guard';
// import { AdminGuard } from '../core/guards/admin-guard.guard';

const routes: Routes = [
{path: 'send-message',canActivate:[AuthenticationGuard], component: SendMessageComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }

