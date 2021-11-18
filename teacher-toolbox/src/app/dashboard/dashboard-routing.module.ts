import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DARK_MODE_OPTIONS } from 'angular-dark-mode';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [
    {
        provide: DARK_MODE_OPTIONS,
        useValue: {
            darkModeClass: 'my-dark-mode',
            lightModeClass: 'my-light-mode'
        }
    }
],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
