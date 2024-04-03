import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessagesService } from '../messages.service';
import { Message } from 'src/app/shared/types/message';
import { User } from 'src/app/shared/types/user';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit, OnDestroy {
  message: Message | undefined
  user: User | undefined
  subscription: Subscription | undefined
  errorMessage: string = ''

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
      this.errorMessage = 'invalid form'
      return
    }

    const { name, email, message } = form.value

    if (typeof name === 'string' && typeof email === 'string' && typeof message === 'string') {
      this.message = form.value as Message

      this.subscription = this.messagesService.createMessage(this.message).subscribe({
        next: newMessage => {
          this.router.navigate(['/sunglasses/catalog'])
        }
      })
    } else {
      this.errorMessage = 'Invalid data. Please try again.'
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
