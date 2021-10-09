import { Component, OnInit } from '@angular/core';
import { ClassroomService } from 'src/app/services/classroom.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-classrooms-list',
  templateUrl: './classrooms-list.component.html',
  styleUrls: ['./classrooms-list.component.css']
})
export class ClassroomsListComponent implements OnInit {
  classrooms: any;
  currentClassroom = null;
  currentIndex = -1;
  name = '';

  constructor(private classroomService: ClassroomService) { }

  ngOnInit(): void {
    this.retrieveClassrooms();
  }

  refreshList(): void {
    this.currentClassroom = null;
    this.currentIndex = -1;
    this.retrieveClassrooms();
  }

  retrieveClassrooms(): void {
    this.classroomService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.classrooms = data;
    });
  }

  setActiveClassroom(classroom, index): void {
    this.currentClassroom = classroom;
    this.currentIndex = index;
  }
}
