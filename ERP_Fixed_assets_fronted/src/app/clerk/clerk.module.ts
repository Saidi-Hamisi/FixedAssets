import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClerkRoutingModule } from './clerk-routing.module';

import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    ClerkRoutingModule,
    ComponentsModule,
    SharedModule,
  ]
})
export class ClerkModule { }
