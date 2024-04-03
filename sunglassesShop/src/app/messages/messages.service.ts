import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../shared/types/message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }

  createMessage(message: Message): Observable<Message> {
    return this.http
      .post<Message>('/api/data/messages', message)
  }

  getMessages(): Observable<Message[]> {
    return this.http
      .get<Message[]>('/api/data/messages')
  }
}
