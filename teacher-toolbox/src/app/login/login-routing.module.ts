import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'verify-email', component: VerifyEmailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
