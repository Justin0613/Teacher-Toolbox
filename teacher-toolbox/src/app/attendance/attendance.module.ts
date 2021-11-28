import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AttendanceComponent } from "./attendance.component";

const routes: Routes = [{ path: "attendance", component: AttendanceComponent }];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AttendanceModule {}
