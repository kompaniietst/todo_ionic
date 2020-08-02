import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { ComponentsRoutingModule } from './components-routing.module';
import { SingleTodoComponent } from './single-todo/single-todo.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    SingleTodoComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,IonicModule
  ],
  exports: [
    HeaderComponent,
    SingleTodoComponent
  ]
})
export class ComponentsModule { }
