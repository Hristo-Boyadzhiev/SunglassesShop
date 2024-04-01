import { Component } from '@angular/core';
import { MessagesService } from '../messages.service';
import { Message } from 'src/app/shared/types/message';

@Component({
  selector: 'app-messages-received',
  templateUrl: './messages-received.component.html',
  styleUrls: ['./messages-received.component.css']
})
export class MessagesReceivedComponent {
  isLoading: boolean = true
  isMessage: boolean = false
  messages: Message[] = []

  constructor(private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.messagesService.getMessages().subscribe({
      next: currentMessages => {
        console.log(currentMessages)
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
}
