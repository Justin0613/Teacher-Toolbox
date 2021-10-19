import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { ClassroomService } from 'src/app/services/classroom.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import Classroom from 'src/models/classroom.model';

@Component({
  selector: 'app-classrooms-details',
  templateUrl: './classrooms-details.component.html',
  styleUrls: ['./classrooms-details.component.css']
})
export class ClassroomsDetailsComponent implements OnInit {

  //@Input() classroom: Classroom;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentClassroom: Classroom = null;

  classId: string = "";
  classroom: Classroom = null;

  viewDate: Date = new Date();

  constructor(private classroomService: ClassroomService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.classId = params.get('class_id');

      this.classroomService.getSingle(this.classId, ((data: Classroom) => {
        this.classroom = data;
      }));
    });
  }

  ngOnChanges(): void {
    this.currentClassroom = { ...this.classroom };
  }

  updateClassroom(): void {
    const data = {
      name: this.currentClassroom.name,
      description: this.currentClassroom.description
    };

    this.classroomService.update(this.currentClassroom.id, data)
      .catch(error => window.alert(error));
  }

  deleteClassroom(): void {
    this.classroomService.delete(this.currentClassroom.id)
      .then(() => {
        this.refreshList.emit();
      })
      .catch(error => window.alert(error));
  }
}
