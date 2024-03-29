import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendMessageComponent } from './send-message/send-message.component';
import { AuthenticatedGuard } from '../core/guards/authenticated-guard.guard';


const routes: Routes = [
  { path: 'send-message', canActivate: [AuthenticatedGuard], component: SendMessageComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }

