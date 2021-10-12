import { DashboardComponent } from '../dashboard/dashboard.component';
import { ClassroomsComponent } from '../classrooms/classrooms.component';
import { StudentsComponent } from '../students/students.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataResolverService } from '../services/data-resolver.service';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'classrooms', component: ClassroomsComponent, resolve: { userdata: DataResolverService } },
  { path: 'students', component: StudentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationBarRoutingModule { }
