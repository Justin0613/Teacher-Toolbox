import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./../login.component.css']
})

export class SignInComponent implements OnInit {

  constructor(
    public AuthService: AuthService
  ) { }

  ngOnInit() { }

}