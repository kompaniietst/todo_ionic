import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Todo } from '../models/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  collectionName: string = "todos";

  constructor(private firestore: AngularFirestore) { }

  createTodoItem(data: Todo) {
    return this.firestore
      .collection(this.collectionName)
      .add(data)
  }

  getTodos() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  removeSingleTodo(id: string): Promise<any> {
    return this.firestore
      .collection(this.collectionName)
      .doc(id)
      .delete()
  }

  async editSingleTodo(id: string, task: { task: string }): Promise<any> {
    try {
      return this.firestore
        .collection(this.collectionName)
        .doc(id)
        .set(task);
    }
    catch (error) {
      console.error("Error editing document: ", error);
    }
  }

  async markTodoAsCompleted(id: string, isCompleted: { isCompleted: boolean }): Promise<any> {
    try {
      return this.firestore
        .collection(this.collectionName)
        .doc(id)
        .update(isCompleted);
    }
    catch (error) {
      console.error("Error editing document: ", error);
    }
  }

  async resetTodo(id: string, todo: { task: string, isCompleted: boolean }): Promise<any> {
    try {
      return this.firestore
        .collection(this.collectionName)
        .doc(id)
        .update(todo);
    }
    catch (error) {
      console.error("Error editing document: ", error);
    }
  }
}