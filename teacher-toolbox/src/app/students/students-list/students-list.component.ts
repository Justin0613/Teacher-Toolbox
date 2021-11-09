import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import { map } from 'rxjs/operators';
import { ExcelService } from 'src/app/services/excel.service';
import * as XLSX from 'xlsx';
import { Student } from 'src/models/student.model';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css'],
})
export class StudentsListComponent implements OnInit {
  students: Student[];
  name = '';
  userData: any;
  queryString: String;

  constructor(private auth: AuthService, private studentService: StudentsService, private excel: ExcelService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.retrieveStudent();
    this.userData = this.route.snapshot.data.userdata;
    this.queryString = '';
  }

  refreshList(): void {
    this.retrieveStudent();
  }

  retrieveStudent(): void {
    this.studentService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
        this.students = data;
      });
  }

  onFileChange(event: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = XLSX.utils.sheet_to_json(ws);

      for (let i = 0; i < data.length; i++) {
        const student = new Student();
        let studentName: string = data[i]["Student Name"];
        let parentName: string = data[i]["Parent Name"];
        let parentPhone: string = data[i]["Parent Phone Number"];
        let parentEmail: string = data[i]["Parent Email"];

        student.firstName = studentName.substring(0, studentName.indexOf(" "));
        student.lastName = studentName.substring(studentName.indexOf(" ") + 1);
        student.parentFirstName = parentName.substring(0, parentName.indexOf(" "));
        student.parentLastName = parentName.substring(parentName.indexOf(" ") + 1);
        student.parentPhone = parentPhone;
        student.parentEmail = parentEmail;
        student.teacherID = this.auth.userState.uid;
        this.studentService.create(student);
      }
    };
 }

  exportData(tableId: string) {
    this.students.forEach( (element: Student) => {
      const student = new Student();
      student.firstName = element.firstName;
      student.lastName = element.lastName;
      student.parentFirstName = element.parentFirstName;
      student.parentLastName = element.parentLastName;
      student.parentPhone = element.parentPhone;
      student.parentEmail = element.parentEmail;
    });

    if (!tableId) throw new Error('Element Id does not exists');

    let tbl = document.getElementById(tableId);
    let wb = XLSX.utils.table_to_book(tbl);
    XLSX.writeFile(wb, "students.xlsx");
  }

}
