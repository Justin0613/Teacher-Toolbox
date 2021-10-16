import { ClassroomService } from './../services/classroom.service';
import { NavigationBarModule } from './../navigation-bar/navigation-bar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClassroomsRoutingModule } from './classrooms-routing.module';
import { ClassroomsComponent } from './classrooms.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClassroomsListComponent } from './classrooms-list/classrooms-list.component';
import { ClassroomsDetailsComponent } from './classrooms-details/classrooms-details.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


@NgModule({
  declarations: [
    ClassroomsComponent,
    ClassroomsListComponent,
    ClassroomsDetailsComponent
  ],
  imports: [
    CommonModule,
    ClassroomsRoutingModule,
    NavigationBarModule,
    FormsModule,
    NgbModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ],
  providers: [
    ClassroomService,
  ]
})
export class ClassroomsModule { }
