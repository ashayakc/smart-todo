import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { CommonModule } from '@angular/common';  // ✅ Import CommonModule
import { RouterModule } from '@angular/router';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, RouterModule],  // ✅ Include CommonModule here
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe(data => this.todos = data);
  }

  // Create a new todo
  addTodo(newTodo: Todo): void {
    this.todoService.addTodo(newTodo).subscribe(() => {
      this.loadTodos();  // Reload todos after adding a new one
    });
  }

  // Update an existing todo
  editTodo(updatedTodo: Todo): void {
    this.todoService.updateTodo(updatedTodo.id, updatedTodo).subscribe(() => {
      this.loadTodos();  // Reload todos after updating
    });
  }

  // Delete a todo
  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.loadTodos();  // Reload todos after deletion
    });
  }
}
