import { Component, OnDestroy } from '@angular/core';
import { MessagesService } from '../messages.service';
import { Message } from 'src/app/shared/types/message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messages-received',
  templateUrl: './messages-received.component.html',
  styleUrls: ['./messages-received.component.css']
})
export class MessagesReceivedComponent implements OnDestroy {
  isLoading: boolean = true
  isMessage: boolean = false
  messages: Message[] = []
  subscription: Subscription | undefined

  constructor(private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.subscription = this.messagesService.getMessages().subscribe({
      next: currentMessages => {
        this.isLoading = false
        if (currentMessages.length === 0) {
          this.isMessage = false
        } else {
          this.isMessage = true
          this.messages = currentMessages
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
