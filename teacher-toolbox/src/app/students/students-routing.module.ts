import { DataResolverService } from './../services/data-resolver.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsDetailsComponent } from './students-details/students-details.component';

const routes: Routes = [
  { path: 'students/:student_id', component: StudentsDetailsComponent, resolve: { userdata: DataResolverService} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
