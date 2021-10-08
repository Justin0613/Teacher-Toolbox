import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

@NgModule({
  declarations: [
    ForgotPasswordComponent,
    SignInComponent,
    SignUpComponent,
    VerifyEmailComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
  ]
})
export class LoginModule { }
