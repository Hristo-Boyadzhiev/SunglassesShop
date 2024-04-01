import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent {

  constructor(private messagesService: MessagesService){}

  sendMessageHandler(form:NgForm){
    if(form.invalid){
      console.log('invalid form')
      return
    }

   const {name, email, message} = form.value


  }
}
