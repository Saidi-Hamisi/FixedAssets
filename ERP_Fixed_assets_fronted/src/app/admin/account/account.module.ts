import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UpdatePasswordComponent,
    UpdateProfileComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    ComponentsModule,
    SharedModule
  ]
})
export class AccountModule { }
