import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from "@angular/core";
import { ClassroomService } from "src/app/services/classroom.service";
import { StudentsService } from "src/app/services/students.service";
import { map } from "rxjs/operators";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Classroom from "src/models/classroom.model";
import { Student } from "src/models/student.model";
import { CalendarEvent } from "angular-calendar";
import { Attendance } from "src/models/attendance.model";

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
    tempStudentDataList: any[];
    classId: string = "";
    userData: any = null;

    numEvents: number = 0;

    viewDate: Date = new Date();
    currentDate: Date = new Date();
    currentDateString: string = this.currentDate.toISOString().split("T")[0];
    selectedDate: Date = this.viewDate;
    selectedEventIndex: number;
    calendarEvents: CalendarEvent[] = [];

    @Output() refresh = new EventEmitter<any>();
    newEventInput: any = { title: "", date: "" };

    tempAttendance: Attendance;
    newAttendanceInput: Attendance[] = [];

    constructor(
        private classroomService: ClassroomService,
        private studentService: StudentsService,
        private modal: NgbModal,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.userData = this.route.snapshot.data.userdata;
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.classId = params.get("class_id");

            this.classroomService.getSingle(this.classId, (data: Classroom) => {
                this.currentClassroom = data;
                this.currentClassroom.events.forEach((event) => {
                    this.calendarEvents.push({ start: new Date(event.start), title: event.title });
                });
                this.refresh.emit(null);
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
    }

    ngOnChanges(): void {}

    triggerModal(content) {
        this.modal.open(content).result;
    }

    getViewMonth(): string {
        var months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        return months[this.viewDate.getMonth()] + " - " + this.viewDate.getFullYear();
    }

    switchViewMonth(step: number): void {
        var newMonth: number = this.viewDate.getMonth() + step;

        if (newMonth >= 12) {
            this.viewDate.setMonth(0);
            this.viewDate.setFullYear(this.viewDate.getFullYear() + 1);
        } else if (newMonth < 0) {
            this.viewDate.setMonth(11);
            this.viewDate.setFullYear(this.viewDate.getFullYear() - 1);
        } else this.viewDate.setMonth(newMonth);

        this.refresh.emit(null);
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

    onEventClicked(event): void {
        this.selectedEventIndex = this.calendarEvents.findIndex((e) => e == event.event);
        this.newEventInput.title = this.calendarEvents[this.selectedEventIndex].title;
        this.newEventInput.date = this.calendarEvents[this.selectedEventIndex].start
            .toISOString()
            .split("T")[0];
    }

    addNewEvent(): void {
        let newEvent: any = new Object();
        newEvent.start = new Date(this.newEventInput.date);
        newEvent.start.setDate(newEvent.start.getDate() + 1);
        newEvent.title = this.newEventInput.title;
        this.calendarEvents.push(newEvent);

        this.currentClassroom.events.push({
            start: newEvent.start.toDateString(),
            title: newEvent.title
        });
        this.classroomService.update(this.classId, this.currentClassroom);

        this.newEventInput = { title: "", date: "" };
        this.refresh.emit(null);
    }

    saveSelectedEvent(): void {
        this.calendarEvents[this.selectedEventIndex].start = new Date(this.newEventInput.date);
        this.calendarEvents[this.selectedEventIndex].start.setDate(
            this.calendarEvents[this.selectedEventIndex].start.getDate() + 1
        );
        this.calendarEvents[this.selectedEventIndex].title = this.newEventInput.title;
        this.refresh.emit(null);

        this.currentClassroom.events[this.selectedEventIndex].title =
            this.calendarEvents[this.selectedEventIndex].title;
        this.currentClassroom.events[this.selectedEventIndex].start =
            this.calendarEvents[this.selectedEventIndex].start.toDateString();
        this.classroomService.update(this.classId, this.currentClassroom);

        this.newEventInput = { title: "", date: "" };
    }

    deleteSelectedEvent(): void {
        this.calendarEvents.splice(this.selectedEventIndex, 1);
        this.currentClassroom.events.splice(this.selectedEventIndex, 1);
        this.classroomService.update(this.classId, this.currentClassroom);
        this.refresh.emit(null);

        this.newEventInput = { title: "", date: "" };
    }

    getEventsByDay(date: number): any[] {
        return this.calendarEvents.filter((event) => event.start.getDate() == date);
    }

    addStudent(student: Student): void {
        this.tempStudentsList.push(student.id);
        var stu = this.allStudents.find((s) => s.id == student.id);
        this.tempStudentDataList.push({
            name: stu.firstName + " " + stu.lastName,
            seat: -1,
            role: "Unassigned"
        });
        this.allStudents.find((s) => s.id == student.id).classIDs.push(this.classId);
    }

    removeStudent(student: Student): void {
        this.tempStudentsList.forEach((value, index) => {
            if (value == student.id) {
                this.tempStudentsList.splice(index, 1);
                this.tempStudentDataList.splice(index, 1);
            }
        });

        this.allStudents
            .find((s) => s.id == student.id)
            .classIDs.forEach((value, index) => {
                if (value == this.classId) {
                    this.allStudents.find((s) => s.id == student.id).classIDs.splice(index, 1);
                }
            });
    }

    initTempStudentList(): void {
        this.tempStudentsList = this.currentClassroom.studentIDs.slice();
        this.tempStudentDataList = this.currentClassroom.studentData.slice();
    }

    saveStudentsList(): void {
        this.currentClassroom.studentIDs = this.tempStudentsList.slice();
        this.currentClassroom.studentData = this.tempStudentDataList.slice();
        this.classroomService.update(this.classId, this.currentClassroom);
        this.allStudents.forEach((s) => {
            this.studentService.update(s.id, s);
        });
    }

    newAttendanceList() {
        if (this.newAttendanceInput.length == 0) {
            this.allStudents.forEach((s) => {
                this.tempAttendance = {
                    id: s.id,
                    date: this.selectedDate,
                    status: ""
                };
                this.newAttendanceInput.push(this.tempAttendance);
            });
        }
        console.log(this.newAttendanceInput);
    }
    saveAttendance(): void {
        console.log(this.newAttendanceInput);

        let newEvent: any = new Object();
        newEvent.start = this.selectedDate;
        this.calendarEvents.push(newEvent);

        this.currentClassroom.events.push({
            start: newEvent.start.toDateString(),
            title: "Attendance"
        });
        this.classroomService.update(this.classId, this.currentClassroom);

        this.newAttendanceInput.forEach((student) => {
            student.status = "";
            student.date = null;
        });
        this.newEventInput = { title: "", date: "" };
        this.refresh.emit(null);
    }
    allPresent(): void {
        this.newAttendanceInput.forEach((student) => {
            student.status = "present";
        });
    }
    getStudentData(student: Student): any {
        var index: number = this.currentClassroom.studentIDs.findIndex((s) => s == student.id);
        var data: any = this.currentClassroom.studentData[index];
        return data;
    }
}
