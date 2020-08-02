import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Todo } from 'src/app/core/models/Todo';
import { TodosService } from 'src/app/core/services/todos.service';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalPage } from 'src/app/modal/modal.page';

@Component({
  selector: 'app-single-todo',
  templateUrl: './single-todo.component.html',
  styleUrls: ['./single-todo.component.scss'],
})
export class SingleTodoComponent implements OnInit {

  @Input() todo: Todo;

  @ViewChild('input') input;

  alowEdit: boolean = false;

  constructor(
    private todosService: TodosService,
    public toastController: ToastController,
    public modalController: ModalController) { }

  editSingleTodo(editFormValue: any) {
      this.todosService.editSingleTodo(this.todo.id, editFormValue)
        .then((() => this.presentToast('Task successfully edited', 'warning')))

    this.alowEdit = false;
  }

  markTodoAsCompleted(todo: Todo) {
    this.todosService.markTodoAsCompleted(todo.id, { isCompleted: true })
      .then((() => this.presentToast('Task successfully done', 'success')))
  }

  resetTodo(todo: Todo) {
    this.todosService.resetTodo(todo.id, { task: todo.task, isCompleted: false })
      .then((() => this.presentToast('Task successfully reset', 'success')))
  }

  removeSingleTodo() {
    this.todosService.removeSingleTodo(this.todo.id)
      .then((() => this.presentToast('Task successfully removed', 'danger')))
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  }

  presentToast(message: string, color: string) {
    this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    }).then((toastData) => {
      toastData.present();
    })
  }

  showEditBlock() {
    this.alowEdit = true;
    // setTimeout(() => this.input.setFocus(), 150);
  }

  ngOnInit() {
    console.log('t ', this.todo);
  }

}
