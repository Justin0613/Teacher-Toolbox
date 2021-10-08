import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
})
export class AttendanceComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const buttons = document.getElementsByClassName('student');
    console.log(buttons);
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', () => {
        buttons[i].classList.toggle('present');
      });
    }
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
