import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {
  messages: { text: string; isUser: boolean }[] = [];
  newMessage = '';
  backendUrl = 'http://localhost:5290/api/todo/process'; // Assuming backend is running on port 5000
  @Output() todosUpdated = new EventEmitter<void>();
  todos: any;

  constructor(private http: HttpClient, private todoService: TodoService) {}

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push({ text: this.newMessage, isUser: true });
      this.getBotResponse(this.newMessage);
      this.newMessage = '';
    }
  }

  getBotResponse(message: string) {
    this.http.post<any>(this.backendUrl, `"${message}"`, { headers: { 'Content-Type': 'application/json' } })
      .subscribe(
        (response) => {
          let botResponse = response.summary;
          if (response.data && response.data.message) {
            botResponse += `: ${response.data.message}`;
          }
          if (response.data && response.data.title) {
            botResponse += `: ${response.data.title}`;
          }
          if (response.data && response.data.count) {
            botResponse += `: ${response.data.count}`;
          }
          this.messages.push({ text: botResponse, isUser: false });
          this.todosUpdated.emit(); // Emit event after successful response
          this.loadTodos(); // Load todos after bot response
        },
        (error) => {
          console.error('Error fetching bot response:', error);
          this.messages.push({ text: 'Error fetching response from bot.', isUser: false });
        }
      );
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe(data => this.todos = data);
  }
}
