import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    UpdatePasswordComponent,
    UpdateProfileComponent,
    NotificationsComponent
  ],


  imports: [
    CommonModule,
    AccountRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    ComponentsModule,
    SharedModule,
    MatTabsModule,
    MatCheckboxModule,

    NgbModule,
    PerfectScrollbarModule
  ]
})
export class AccountModule { }
