import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepreciationsRoutingModule } from './depreciations-routing.module';
import { DepreciationsComponent } from './pages/depreciations/depreciations.component';


@NgModule({
  declarations: [
    DepreciationsComponent
  ],
  imports: [
    CommonModule,
    DepreciationsRoutingModule
  ]
})
export class DepreciationsModule { }
