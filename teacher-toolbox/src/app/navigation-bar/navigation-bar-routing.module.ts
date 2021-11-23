import { DashboardComponent } from "../dashboard/dashboard.component";
import { ClassroomsComponent } from "../classrooms/classrooms.component";
import { StudentsComponent } from "../students/students.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DataResolverService } from "../services/data-resolver.service";
import { AccountSettingsComponent } from "../account-settings/account-settings.component";

const routes: Routes = [
    {
        path: "dashboard",
        component: DashboardComponent,
        resolve: { userdata: DataResolverService }
    },
    {
        path: "classrooms",
        component: ClassroomsComponent,
        resolve: { userdata: DataResolverService }
    },
    {
        path: "students",
        component: StudentsComponent,
        resolve: { userdata: DataResolverService }
    },
    {
        path: "account-settings",
        component: AccountSettingsComponent,
        resolve: { userdata: DataResolverService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NavigationBarRoutingModule {}
