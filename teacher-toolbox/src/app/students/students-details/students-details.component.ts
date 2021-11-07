import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Student } from 'src/models/student.model';
//import Student from 'src/models/student.model';
//push this plz

@Component({
  selector: 'app-students-details',
  templateUrl: './students-details.component.html',
  styleUrls: ['./students-details.component.css']
})
export class StudentsDetailsComponent implements OnInit {

  //@Input() student: Student;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentStudent: Student = null;

  StudentId: string = "";
  student: Student = null;

  viewDate: Date = new Date();

  constructor(private studentService: StudentsService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.StudentId = params.get('students_id');

      this.studentService.getSingle(this.StudentId, ((data: Student) => {
        this.student = data;
      }));
    });
  }

  ngOnChanges(): void {
    this.currentStudent = { ...this.student };
  }

  // updateStudent(): void {
  //   const data = {
  //     firstName: this.currentStudent.firstName,
  //     lastName: this.currentStudent.lastName,

  //   };

  //   this.studentService.update(this.currentStudent.id, data)
  //     .catch(error => window.alert(error));
  // }

  // deleteClassroom(): void {
  //   this.studentService.delete(this.currentStudent.id)
  //     .then(() => {
  //       this.refreshList.emit();
  //     })
  //     .catch(error => window.alert(error));
  // }
}
