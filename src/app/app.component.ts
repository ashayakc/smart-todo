import { Component } from '@angular/core';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { TodoModalComponent } from './components/todo-modal/todo-modal.component';
import { Todo } from './models/todo.model';
import { CommonModule } from '@angular/common';
import { TodoService } from './services/todo.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, TodoListComponent, TodoFormComponent, FormsModule, ChatbotComponent, TodoModalComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'smart-todo-app';
  showTodoForm = false;
  showModal = false;
  selectedTodo: Todo | null = null;
  @Output() todosLoaded = new EventEmitter<void>();

  constructor(private todoService: TodoService) {}

  toggleTodoForm() {
    this.showTodoForm = !this.showTodoForm;
  }

  openAddModal() {
    this.selectedTodo = null;
    this.showModal = true;
  }

  openEditModal(todo: Todo) {
    this.selectedTodo = todo;
    this.showModal = true;
  }

  onCloseModal() {
    this.showModal = false;
    this.selectedTodo = null;
  }

  onSaveTodo(todo: Todo) {
    if (todo.id) {
      this.todoService.updateTodo(todo.id, todo).subscribe(() => {
        this.loadTodos();
      });
    } else {
      this.todoService.addTodo(todo).subscribe(() => {
        this.loadTodos();
      });
    }
    this.showModal = false;
    this.selectedTodo = null;
  }

  loadTodos() {
    this.todosLoaded.emit();
  }
}
