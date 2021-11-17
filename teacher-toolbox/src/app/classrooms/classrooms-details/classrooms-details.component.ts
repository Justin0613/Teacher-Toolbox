import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from "@angular/core";
import { ClassroomService } from "src/app/services/classroom.service";
import { StudentsService } from "src/app/services/students.service";
import { map } from "rxjs/operators";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Classroom from "src/models/classroom.model";
import { Student } from "src/models/student.model";
import { CalendarEvent } from "angular-calendar";

@Component({
    selector: "app-classrooms-details",
    templateUrl: "./classrooms-details.component.html",
    styleUrls: ["./classrooms-details.component.css"]
})
export class ClassroomsDetailsComponent implements OnInit {
    // @Input() classroom: Classroom;
    @Output() refreshList: EventEmitter<any> = new EventEmitter();
    currentClassroom: Classroom = new Classroom();
    allStudents: Student[]; 
    tempStudentsList: string[];
    classId: string = "";

    viewDate: Date = new Date();
    selectedDate: Date = this.viewDate;
    calendarEvents: CalendarEvent[] = [];

    @Output() refresh = new EventEmitter<any>();
    newEventInput: any = { title: "", date: "" };

    constructor(
        private classroomService: ClassroomService,
        private studentService: StudentsService,
        private modal: NgbModal,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.classId = params.get("class_id");

            this.classroomService.getSingle(this.classId, (data: Classroom) => {
                this.currentClassroom = data;
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
        });

        let newEvent: any = new Object();
        newEvent.start = new Date();
        newEvent.title = "New Event";
        this.calendarEvents.push(newEvent);
    }

    ngOnChanges(): void {}

    triggerModal(content) {
        this.modal.open(content).result;
    }

    updateClassroom(): void {
        const data = {
            name: this.currentClassroom.name,
            description: this.currentClassroom.description
        };

        this.classroomService
            .update(this.currentClassroom.id, data)
            .catch((error) => window.alert(error));
    }

    deleteClassroom(): void {
        this.classroomService
            .delete(this.currentClassroom.id)
            .then(() => {
                this.refreshList.emit();
            })
            .catch((error) => window.alert(error));
    }

    onDayClicked(event): void {
        this.selectedDate = event.day.date;
    }

    addNewEvent(): void {
        let newEvent: any = new Object();
        newEvent.start = new Date(this.newEventInput.date);
        newEvent.title = this.newEventInput.title;
        this.calendarEvents.push(newEvent);

        this.newEventInput = { title: "", date: "" };
        this.refresh.emit(null);
    }

    addStudent(student: Student): void {
        this.tempStudentsList.push(student.id);
    }

    removeStudent(student: Student): void {
        this.tempStudentsList.forEach((value, index)=>{
            if(value == student.id) this.tempStudentsList.splice(index, 1);
        });
    }

    initTempStudentList(): void {
        this.tempStudentsList = this.currentClassroom.studentIDs.slice();
    }

    saveStudentsList(): void {
        this.currentClassroom.studentIDs = this.tempStudentsList.slice();
        this.classroomService.update(this.classId, this.currentClassroom);
    }
}
