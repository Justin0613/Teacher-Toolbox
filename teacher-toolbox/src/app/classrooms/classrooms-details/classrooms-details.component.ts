import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from "@angular/core";
import { ClassroomService } from "src/app/services/classroom.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Classroom from "src/models/classroom.model";
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
    classId: string = "";

    viewDate: Date = new Date();
    selectedDate: Date = this.viewDate;
    calendarEvents: CalendarEvent[] = [];

    @Output() refresh = new EventEmitter<any>();
    newEventInput: any = { title: "", date: "" };

    constructor(
        private classroomService: ClassroomService,
        private modal: NgbModal,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.classId = params.get("class_id");

            this.classroomService.getSingle(this.classId, (data: Classroom) => {
                this.currentClassroom = data;
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
}
