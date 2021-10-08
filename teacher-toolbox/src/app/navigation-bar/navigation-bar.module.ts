import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationBarRoutingModule } from './navigation-bar-routing.module';
import { NavigationBarComponent } from './navigation-bar.component';


@NgModule({
  declarations: [
    NavigationBarComponent
  ],
  imports: [
    CommonModule,
    NavigationBarRoutingModule,
  ],
  exports: [NavigationBarComponent]
})
export class NavigationBarModule { }
