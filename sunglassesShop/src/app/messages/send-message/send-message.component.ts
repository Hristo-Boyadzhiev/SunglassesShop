import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from 'src/app/shared/types/message';
import { Router } from '@angular/router';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent {
  message: Message | undefined

  constructor(
    private messagesService: MessagesService,
    private router: Router
  ) { }

  sendMessageHandler(form: NgForm) {
    if (form.invalid) {
      console.log('invalid form')
      return
    }

    this.message = form.value as Message

    this.messagesService.createMessage(this.message).subscribe({
      next: newMessage => {
        this.router.navigate(['/sunglasses/catalog'])
      }
    })
  }
}
