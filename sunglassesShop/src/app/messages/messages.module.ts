import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendMessageComponent } from './send-message/send-message.component';
import { SharedModule } from '../shared/shared.module';
import { MessagesRoutingModule } from './messages-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SendMessageComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class MessagesModule { }
