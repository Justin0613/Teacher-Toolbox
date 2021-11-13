import { AuthService } from "../services/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-navigation-bar",
    templateUrl: "./navigation-bar.component.html",
    styleUrls: ["./navigation-bar.component.css"]
})
export class NavigationBarComponent implements OnInit {
    constructor(public AuthService: AuthService) {}

    ngOnInit(): void {}
}
