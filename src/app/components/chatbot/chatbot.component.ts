import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push({ text: this.newMessage, isUser: true });
      // Send message to backend and get response
      this.getBotResponse(this.newMessage);
      this.newMessage = '';
    }
  }

  getBotResponse(message: string) {
    // Replace this with your actual API call to the backend
    setTimeout(() => {
      const botResponse = `This is a dummy response for: ${message}`;
      this.messages.push({ text: botResponse, isUser: false });
    }, 1000);
  }
}
