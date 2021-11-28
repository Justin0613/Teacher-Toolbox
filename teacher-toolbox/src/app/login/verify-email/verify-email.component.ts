import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-verify-email",
    templateUrl: "./verify-email.component.html",
    styleUrls: ["./../login.component.css"]
})
export class VerifyEmailComponent implements OnInit {
    constructor(public AuthService: AuthService) {}

    ngOnInit(): void {}
}
