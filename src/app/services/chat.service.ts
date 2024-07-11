import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = 'http://localhost:8087/chat';

  constructor(private http: HttpClient) { }

  initializeConversation(): Observable<{ chatId: string }> {
    return this.http.post<{ chatId: string }>(this.baseUrl, {});
  }

  sendMessage(chatId: string, message: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${chatId}/message`, { message });
  }

  refresh(chatId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/${chatId}/refresh`);
  }
}
