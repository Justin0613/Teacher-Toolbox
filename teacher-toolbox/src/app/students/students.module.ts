import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { NavigationBarModule } from "../navigation-bar/navigation-bar.module";
import { StudentsRoutingModule } from "./students-routing.module";
import { StudentsComponent } from "./students.component";
import { StudentsListComponent } from "./students-list/students-list.component";
import { StudentsDetailsComponent } from "./students-details/students-details.component";

@NgModule({
    declarations: [StudentsComponent, StudentsListComponent, StudentsDetailsComponent],
    imports: [CommonModule, StudentsRoutingModule, NavigationBarModule, FormsModule, NgbModule]
})
export class StudentsModule {}
