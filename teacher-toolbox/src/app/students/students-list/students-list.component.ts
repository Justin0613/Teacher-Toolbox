import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  students: any;
  currentStudent = null;
  currentIndex = -1;
  name = '';

  constructor(private studentService: StudentsService) { }

  ngOnInit(): void {
    this.retrieveStudent();
  }

  refreshList(): void {
    this.currentStudent = null;
    this.currentIndex = -1;
    this.retrieveStudent();
  }

  retrieveStudent(): void {
    this.studentService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.students = data;
    });
  }

  setActiveStudent(student: any, index: number): void {
      this.currentStudent = student;
      this.currentIndex = index;
  }
}