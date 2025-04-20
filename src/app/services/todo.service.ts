import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [
    { id: 1, title: 'Learn Angular', description: 'Understand components and services', completed: false },
    { id: 2, title: 'Build a Todo App', description: 'With CRUD operations', completed: false }
  ];

  constructor() {}

  getTodos(): Observable<Todo[]> {
    return of(this.todos);
  }

  getTodo(id: number): Observable<Todo | undefined> {
    const todo = this.todos.find(t => t.id === id);
    return of(todo);
  }

  addTodo(todo: Todo): Observable<Todo> {
    todo.id = this.generateId();
    this.todos.push(todo);
    return of(todo);
  }

  updateTodo(updated: Todo): Observable<Todo> {
    const index = this.todos.findIndex(t => t.id === updated.id);
    if (index > -1) {
      this.todos[index] = updated;
    }
    return of(updated);
  }

  deleteTodo(id: number): Observable<boolean> {
    this.todos = this.todos.filter(t => t.id !== id);
    return of(true);
  }

  private generateId(): number {
    return this.todos.length > 0 ? Math.max(...this.todos.map(t => t.id)) + 1 : 1;
  }
}
