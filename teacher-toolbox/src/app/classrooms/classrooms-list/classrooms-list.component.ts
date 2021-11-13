import { Component, OnInit } from "@angular/core";
import { ClassroomService } from "src/app/services/classroom.service";
import { map } from "rxjs/operators";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "app-classrooms-list",
    templateUrl: "./classrooms-list.component.html",
    styleUrls: ["./classrooms-list.component.css"]
})
export class ClassroomsListComponent implements OnInit {
    classrooms: any;
    currentClassroom = null;
    name = "";
    queryString: String;

    constructor(private classroomService: ClassroomService, private modal: NgbModal) {}

    ngOnInit(): void {
        this.queryString = "";
        this.retrieveClassrooms();
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
            });
    }

    triggerModal(content, classroom) {
        this.currentClassroom = classroom;
        this.modal.open(content).result;
    }

    saveClassroom(classroom) {
        this.classroomService.update(classroom.id, classroom);
    }

    deleteClassroom(classroom) {
        this.classroomService.delete(classroom.id);
    }
}
