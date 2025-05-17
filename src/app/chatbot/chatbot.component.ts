import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject, takeUntil } from 'rxjs';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  standalone: false,
})
export class ChatbotComponent implements OnInit, OnDestroy {
  userInput: string = '';
  messages: Message[] = [];
  isChatbotVisible = false;
  isLoading: boolean = false; // Add a loading indicator
  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    //  Initialize the chat with a greeting from the bot
    this.messages.push({
      sender: 'bot',
      text: 'Hello! How can I assist you today?',
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  clearMessages(): void {
    this.messages = [];
    this.messages.push({ sender: 'bot', text: 'Chat history cleared.' });
  }

  sendMessage(): void {
    const prompt = this.userInput.trim();
    if (!prompt) return;

    this.messages.push({ sender: 'user', text: prompt });
    this.userInput = '';
    this.isLoading = true; // Set loading to true before sending the request

    const url = 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1';
    const apiKey = environment.apiKey;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    });

    const body = {
      model: 'qwen-plus',
      messages: [{ role: 'user', content: prompt }],
    };

    this.http
      .post<any>(url, body, { headers })
      .pipe(takeUntil(this.destroy$)) // Unsubscribe automatically on component destruction
      .subscribe({
        next: (response) => {
          this.isLoading = false; // Set loading to false when response is received
          let reply = 'No reply.';
          if (
            response &&
            response.output &&
            response.output.choices &&
            response.output.choices.length > 0
          ) {
            reply = response.output.choices[0].message.content.trim();
          }
          this.messages.push({ sender: 'bot', text: reply });
        },
        error: (error) => {
          this.isLoading = false; // Set loading to false on error as well
          console.error('API error:', error);
          console.error('Full error response:', error.error);
          this.messages.push({
            sender: 'bot',
            text: '⚠️ Error getting response.',
          });
        },
      });
  }
}
