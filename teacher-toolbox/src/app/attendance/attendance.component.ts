import { Component, OnInit } from '@angular/core';
import { Student } from './student.model';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
})
export class AttendanceComponent implements OnInit {
  students: Student[];
  present: Student[];
  absent: Student[];

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

  togglePresent(student: Student) {
    student.present = !student.present;
  }
  toggleAbsent(student: Student) {
    student.absent = !student.absent;
  }

  sendAttendance() {
    const buttons = document.getElementsByClassName('student present');
    let attendance = [];
    for (let i = 0; i < buttons.length; i++) {
      attendance.push(buttons[i].textContent);
    }
    console.log(attendance);
  }
}
