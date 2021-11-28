import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-sign-up",
    templateUrl: "./sign-up.component.html",
    styleUrls: ["./../login.component.css"]
})
export class SignUpComponent implements OnInit {
    constructor(public AuthService: AuthService) {}

    ngOnInit(): void {}
}
