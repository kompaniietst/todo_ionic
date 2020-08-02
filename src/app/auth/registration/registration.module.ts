import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationPageRoutingModule } from './registration-routing.module';

import { RegistrationPage } from './registration.page';
// import { HeaderComponent } from 'src/app/shared/header/header.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistrationPageRoutingModule,
    ComponentsModule
  ],
  declarations: [
    RegistrationPage,
    // HeaderComponent
  ]
})
export class RegistrationPageModule {}
