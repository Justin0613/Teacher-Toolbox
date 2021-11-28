import { AuthService } from "src/app/services/auth.service";
import * as XLSX from "xlsx";
import { StudentsService } from "../services/students.service";
import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute } from "@angular/router";
import { Student } from "src/models/student.model";

@Component({
    selector: "app-students",
    templateUrl: "./students.component.html",
    styleUrls: ["./students.component.css"]
})
export class StudentsComponent implements OnInit {
    userData: any;
    student: Student = new Student();
    submitted: Boolean = false;

    constructor(
        private studentService: StudentsService,
        private modal: NgbModal,
        private auth: AuthService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.userData = this.route.snapshot.data.userdata;
    }

    triggerModal(content) {
        this.modal.open(content).result;
    }

    saveStudent(
        studentFirstName: string,
        studentLastName: string,
        parentFirstName: string,
        parentLastName: string,
        parentPhone: string,
        parentEmail: string,
        grade: string
    ): void {
        if (
            studentFirstName == "" ||
            studentLastName == "" ||
            parentFirstName == "" ||
            parentLastName == "" ||
            parentPhone == "" ||
            parentEmail == "" ||
            grade == ""
        ) {
            window.alert("All fields are required");
        } else {
            this.student.teacherID = this.auth.userState.uid;
            this.studentService
                .create(this.student)
                .then(() => {
                    this.modal.dismissAll();

                    // Clear modal input values
                    this.student.firstName = "";
                    this.student.lastName = "";
                    this.student.parentFirstName = "";
                    this.student.parentLastName = "";
                    this.student.parentPhone = "";
                    this.student.parentEmail = "";
                    this.student.grade = "";
                })
                .catch(() => window.alert("Unable to add new student"));
        }
    }

    exportData(tableId: string) {
        if (!tableId) throw new Error("Element Id does not exists");

        const tbl = document.getElementById(tableId);
        const wb = XLSX.utils.table_to_book(tbl);

        XLSX.writeFile(wb, "students.xlsx", {});
    }
}
