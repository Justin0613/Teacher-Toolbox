import { AuthService } from 'src/app/services/auth.service';
import { ClassroomService } from '../services/classroom.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Classroom from 'src/models/classroom.model';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.css']
})
export class ClassroomsComponent implements OnInit {
  classroom: Classroom = new Classroom();
  submitted: Boolean = false;

  constructor(private classroomService: ClassroomService, private modal: NgbModal, private auth: AuthService) { }

  ngOnInit(): void {
  }

  triggerModal(content) {
    this.modal.open(content).result;
  }

  saveClassroom(classroomName: string, classroomDescription: string): void {
    if (classroomName == "" || classroomDescription == "") {
      window.alert("The name and description must not be blank.");
    }
    else {
      this.classroom.uid = this.auth.userState.uid;
      this.classroomService.create(this.classroom).then(() => {
        this.modal.dismissAll();

        // Clear modal input values
        this.classroom.name = "";
        this.classroom.description = "";
      }).catch(() => window.alert("Unable to add new Classroom"));
    }
  }
}
