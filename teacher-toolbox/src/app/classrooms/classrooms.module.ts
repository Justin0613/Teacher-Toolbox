import { NavigationBarModule } from './../navigation-bar/navigation-bar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassroomsRoutingModule } from './classrooms-routing.module';
import { ClassroomsComponent } from './classrooms.component'


@NgModule({
  declarations: [
    ClassroomsComponent
  ],
  imports: [
    CommonModule,
    ClassroomsRoutingModule,
    NavigationBarModule
  ]
})
export class ClassroomsModule { }
