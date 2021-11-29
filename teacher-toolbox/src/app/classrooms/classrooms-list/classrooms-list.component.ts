import { Component, OnInit } from "@angular/core";
import { ClassroomService } from "src/app/services/classroom.service";
import Classroom from "src/models/classroom.model";
import { Student } from "src/models/student.model";
import { StudentsService } from "src/app/services/students.service";
import { map } from "rxjs/operators";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "app-classrooms-list",
    templateUrl: "./classrooms-list.component.html",
    styleUrls: ["./classrooms-list.component.css"]
})
export class ClassroomsListComponent implements OnInit {
    classrooms: any;
    allStudents: Student[];
    currentClassroom = null;
    name = "";
    queryString: String;
    numClassrooms: number = 0;

    constructor(
        private classroomService: ClassroomService,
        private studentService: StudentsService,
        private modal: NgbModal
    ) {}

    ngOnInit(): void {
        this.retrieveClassrooms();

        this.queryString = "";
    }

    refreshList(): void {
        this.currentClassroom = null;
        this.retrieveClassrooms();
    }

    retrieveClassrooms(): void {
        this.classroomService
            .getAll()
            .snapshotChanges()
            .pipe(
                map((changes) =>
                    changes.map((c) => ({
                        id: c.payload.doc.id,
                        ...c.payload.doc.data()
                    }))
                )
            )
            .subscribe((data) => {
                this.classrooms = data;
                this.numClassrooms = this.classrooms?.length;
            });

        this.studentService
            .getAll()
            .snapshotChanges()
            .pipe(
                map((changes) =>
                    changes.map((c) => ({
                        id: c.payload.doc.id,
                        ...c.payload.doc.data()
                    }))
                )
            )
            .subscribe((data) => {
                this.allStudents = data;
            });
    }

    triggerModal(content, classroom) {
        this.currentClassroom = classroom;
        this.modal.open(content).result;
    }

    saveClassroom(classroom) {
        this.classroomService.update(classroom.id, classroom);
    }

    deleteClassroom(classroom: Classroom) {
        classroom.studentIDs.forEach((student) => {
            this.allStudents
                .find((s) => s.id == student)
                .classIDs.forEach((value, index) => {
                    if (value == classroom.id) {
                        this.allStudents.find((s) => s.id == student).classIDs.splice(index, 1);
                    }
                });
        });

        this.allStudents.forEach((s) => {
            this.studentService.update(s.id, s);
        });

        this.classroomService.delete(classroom.id);
    }
}
