import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { ClassroomService } from 'src/app/services/classroom.service';
import Classroom from 'src/models/classroom.model';

@Component({
  selector: 'app-classrooms-details',
  templateUrl: './classrooms-details.component.html',
  styleUrls: ['./classrooms-details.component.css']
})
export class ClassroomsDetailsComponent implements OnInit {

  @Input() classroom: Classroom;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentClassroom: Classroom = null;
  message = '';

  constructor(private classroomService: ClassroomService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentClassroom = { ...this.classroom };
  }

  updateClassroom(): void {
    const data = {
      name: this.currentClassroom.name,
      description: this.currentClassroom.description
    };

    this.classroomService.update(this.currentClassroom.id, data)
      .then(() => this.message = 'The classroom was updated successfully!')
      .catch(error => window.alert(error));
  }

  deleteClassroom(): void {
    this.classroomService.delete(this.currentClassroom.id)
      .then(() => {
        this.refreshList.emit();
        this.message = 'The classroom was deleted successfully!';
      })
      .catch(error => window.alert(error));
  }
}
