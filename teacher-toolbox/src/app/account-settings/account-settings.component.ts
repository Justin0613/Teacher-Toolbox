import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Component({
    selector: "app-account-settings",
    templateUrl: "./account-settings.component.html",
    styleUrls: ["./account-settings.component.css"]
})
export class AccountSettingsComponent implements OnInit {
    constructor(public AuthService: AuthService) {}

    ngOnInit(): void {}
}
