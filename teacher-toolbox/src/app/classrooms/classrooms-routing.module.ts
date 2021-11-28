import { DataResolverService } from "./../services/data-resolver.service";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClassroomsDetailsComponent } from "./classrooms-details/classrooms-details.component";

const routes: Routes = [
    {
        path: "classrooms/:class_id",
        component: ClassroomsDetailsComponent,
        resolve: { userdata: DataResolverService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClassroomsRoutingModule {}
