import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NavigationBarModule } from "../navigation-bar/navigation-bar.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";

@NgModule({
    declarations: [DashboardComponent],
    imports: [CommonModule, DashboardRoutingModule, NavigationBarModule]
})
export class DashboardModule {}
