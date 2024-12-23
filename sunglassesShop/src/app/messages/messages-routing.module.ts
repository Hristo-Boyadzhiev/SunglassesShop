import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../core/guards/admin-guard.guard';
import { MessagesReceivedComponent } from './messages-received/messages-received.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { AuthenticatedGuard } from '../core/guards/authenticated-guard.guard';



const routes: Routes = [
  { path: 'send-message', canActivate: [AuthenticatedGuard], component: SendMessageComponent },
  { path: 'messages-received', canActivate: [AdminGuard], component: MessagesReceivedComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }

