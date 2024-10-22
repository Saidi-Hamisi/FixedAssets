import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetsRoutingModule } from './widgets-routing.module';
import { WidgetsComponent } from './widgets/widgets.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    WidgetsComponent
  ],
  imports: [
    CommonModule,
    WidgetsRoutingModule,
    MatIconModule
  ],
  exports: [
    WidgetsComponent
  ]
})
export class WidgetsModule { }
