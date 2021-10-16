import { Component, OnInit } from '@angular/core';
import { Student } from './student.model';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
})
export class AttendanceComponent implements OnInit {
  students: Student[] = [];
  present: Student[] = [];
  absent: Student[] = [];

  constructor() {}

  ngOnInit(): void {
    this.students = [
      {
        name: 'Jim',
        sid: '123',
        present: false,
      },
      {
        name: 'steve',
        sid: '145',
        present: false,
      },
      {
        name: 'barry',
        sid: '178',
        present: false,
      },
    ];
  }

  setPresent(student: Student) {
    this.present.push(student);
    this.students.splice(this.students.indexOf(student), 1);
  }
  unsetPresent(student: Student) {
    this.students.push(student);
    this.present.splice(this.present.indexOf(student), 1);
  }
  setAbsent(student: Student) {
    this.absent.push(student);
    this.students.splice(this.students.indexOf(student), 1);
  }
  unsetAbsent(student: Student) {
    this.students.push(student);
    this.absent.splice(this.absent.indexOf(student), 1);
  }

  sendAttendance() {
    const buttons = document.getElementsByClassName('student present');
    let attendance = { presentList: this.present, absentList: this.absent };
    console.log(attendance);
  }
}
