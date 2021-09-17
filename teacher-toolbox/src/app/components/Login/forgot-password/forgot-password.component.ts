import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public AuthService: AuthService) { }

  ngOnInit(): void {
  }

}