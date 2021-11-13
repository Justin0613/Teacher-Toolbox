import { AuthService } from "src/app/services/auth.service";
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { take, map } from "rxjs/operators";

import { Observable } from "rxjs";
@Injectable({
    providedIn: "root"
})
export class DataResolverService implements Resolve<Observable<any>> {
    constructor(private auth: AuthService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.auth.getData().pipe(
            take(1),
            map((userdata) => userdata)
        );
    }
}
