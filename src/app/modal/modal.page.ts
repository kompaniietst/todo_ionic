import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { TodosService } from '../core/services/todos.service';
import { Todo } from '../core/models/Todo';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements AfterViewInit {

  @ViewChild('input') input;

  @Input() todo: Todo;

  task: string;

  constructor(
    private todosService: TodosService,
    public modalCtrl: ModalController,
    public toastController: ToastController) { }

  ngAfterViewInit(): void {
    setTimeout(() => this.input.setFocus(), 500);
  }

  create() {
    const todo = { task: this.task };

    this.todosService.createTodoItem(todo)
      .then((() => this.presentToast('Task successfully created', 'success')))
      .catch(function (error) {
        console.error("Error editing document: ", error);
      });
    this.dismiss();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
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
}