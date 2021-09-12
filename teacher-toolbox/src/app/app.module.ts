import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { environment } from '../environments/environment';

const config = {
  apiKey: "AIzaSyBtzOUZHgggub4ZnHicqBshgwutKFe9ghw",
  authDomain: "teacher-toolbox-36b09.firebaseapp.com",
  projectId: "teacher-toolbox-36b09",
  storageBucket: "teacher-toolbox-36b09.appspot.com",
  messagingSenderId: "655898655040",
  appId: "1:655898655040:web:d7e1c72f6d8c7167db22a5",
  measurementId: "G-F476MK2W2C"
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    //provideFirestore(() => getFirestore()),
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideFirestore(() => getFirestore()),
    // provideAuth(() => getAuth()),
    //AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
