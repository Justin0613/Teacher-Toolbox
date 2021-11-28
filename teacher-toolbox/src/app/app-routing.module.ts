import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    { path: "login", loadChildren: "./login/login.module#LoginModule" },
    {
        path: "navigation",
        loadChildren: "./navigation-bar/navigation-bar.module#NavigationBarModule"
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
