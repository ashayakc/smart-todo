import { Component } from '@angular/core';
import { TodoListComponent } from './components/todo-list/todo-list.component';  // ✅ Import TodoListComponent
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,  // Ensure app.component is standalone as well
  imports: [RouterModule],
  templateUrl: './app.component.html',  // Render the TodoListComponent
})
export class AppComponent {
  title = 'smart-todo-app';
}
