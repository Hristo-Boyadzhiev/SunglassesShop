import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessagesService } from '../messages.service';
import { Message } from 'src/app/shared/types/message';
import { User } from 'src/app/shared/types/user';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit{
  message: Message | undefined
  user: User | undefined

  constructor(
    private messagesService: MessagesService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getUser()
  }

  sendMessageHandler(form: NgForm) {
    if (form.invalid) {
      alert('invalid form')
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
