import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { ClassroomService } from "../services/classroom.service";
import Classroom from "src/models/classroom.model";
import { map } from "rxjs/operators";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
    classes: Classroom[] = null;

    constructor(public AuthService: AuthService, private classroomService: ClassroomService) {}

    ngOnInit(): void {
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
                this.classes = data;
            });
    }

    getLatestEvents(num: number): any[] {
        if (this.classes == null) return [];

        var allEvents: any[] = Array.from(this.classes, (c) => {
            return Array.from(c.events, (e) => {
                return {
                    className: c.name,
                    eventName: e.title,
                    eventDate: new Date(e.start)
                };
            });
        });
        allEvents = [].concat.apply([], allEvents);
        allEvents.sort((a, b) => {
            if (a.eventDate < b.eventDate) return -1;
            else return 1;
        });

        num = Math.min(num, allEvents.length);
        return allEvents.slice(0, num);
    }
}
