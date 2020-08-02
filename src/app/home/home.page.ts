import { Component, OnInit } from '@angular/core';
import { TodosService } from '../core/services/todos.service';
import { ModalPage } from '../modal/modal.page';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../core/models/Todo';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private todosBehaviorSubject = new BehaviorSubject<Todo[]>([]);
  allTodos = [];
  todos$ = this.todosBehaviorSubject.asObservable();

  constructor(
    private todosService: TodosService,
    public modalController: ModalController) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    return this.todosService.getTodos()
      .subscribe(res => {
        const todos = res
          .map(item => {

            let isCompleted = item.payload.doc.data()["isCompleted"];

            return isCompleted
              ? {
                id: item.payload.doc.id,
                task: item.payload.doc.data()["task"],
                isCompleted: item.payload.doc.data()["isCompleted"]
              }
              : {
                id: item.payload.doc.id,
                task: item.payload.doc.data()["task"]
              }
          })

        this.saveToBehaviorSubject(todos);
      })
  };

  saveToBehaviorSubject(todos: Todo[]) {
    this.allTodos = todos;
    this.todosBehaviorSubject.next([...this.allTodos]);
  }

  async presentModal() {
    const modal = await this.modalController.create({ component: ModalPage, });
    return await modal.present();
  }

  trackById(index, todo) {
    return todo.id
  }
}
