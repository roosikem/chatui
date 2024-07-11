import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { MessageInputComponent } from '../message-input/message-input.component';
import { MessageListComponent } from '../message-list/message-list.component';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [MessageInputComponent, MessageListComponent],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css'
})
export class ChatWindowComponent implements OnInit {

  messages: string[] = [];
  chatId: string | null = null;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.initializeConversation().subscribe(response => {
      this.chatId = response.chatId;
      this.refreshMessages();
    });
  }

  handleSendMessage(message: string): void {
    if (this.chatId) {
      this.chatService.sendMessage(this.chatId, message).subscribe(() => {
        this.refreshMessages();
      });
    }
  }

  refreshMessages(): void {
    if (this.chatId) {
      this.chatService.refresh(this.chatId).subscribe(messages => {
        this.messages = messages;
      });
    }
  }
}
