import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MessagesRoutingModule } from './messages-routing.module';
import { FormsModule } from '@angular/forms';

import { MessagesReceivedComponent } from './messages-received/messages-received.component';
import { SendMessageComponent } from './send-message/send-message.component';



@NgModule({
  declarations: [
    SendMessageComponent,
    MessagesReceivedComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class MessagesModule { }
