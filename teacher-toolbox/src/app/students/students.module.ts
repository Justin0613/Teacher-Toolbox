import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationBarModule } from '../navigation-bar/navigation-bar.module';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';


@NgModule({
  declarations: [
    StudentsComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    NavigationBarModule
  ]
})
export class StudentsModule { }
