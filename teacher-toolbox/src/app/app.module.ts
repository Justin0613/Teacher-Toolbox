import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { SignInComponent } from 'src/app/components/Login/sign-in/sign-in.component';
import { SignUpComponent } from 'src/app/components/Login/sign-up/sign-up.component';
import { ForgotPasswordComponent } from 'src/app/components/Login/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from 'src/app/components/Login/verify-email/verify-email.component';
import { AuthService } from '././services/auth.service';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { StudentsComponent } from './components/students/students.component';
import { ClassesComponent } from './components/classes/classes.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    NavigationBarComponent,
    StudentsComponent,
    ClassesComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
