import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "src/app/services/auth.service";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";

import { environment } from "../environments/environment";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AttendanceComponent } from "./attendance/attendance.component";

import { LoginModule } from "./login/login.module";
import { NavigationBarModule } from "./navigation-bar/navigation-bar.module";
import { ClassroomsModule } from "./classrooms/classrooms.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { StudentsModule } from "./students/students.module";
import { AttendanceModule } from "./attendance/attendance.module";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { DarkModeToggleComponent } from "./dark-mode-toggle/dark-mode-toggle.component";

@NgModule({
    declarations: [
        AppComponent,
        AttendanceComponent,
        AccountSettingsComponent,
        DarkModeToggleComponent
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LoginModule,
        NavigationBarModule,
        ClassroomsModule,
        DashboardModule,
        StudentsModule,
        AttendanceModule,
        NgbModule
    ],
    bootstrap: [AppComponent],
    providers: [AuthService]
})
export class AppModule {}
