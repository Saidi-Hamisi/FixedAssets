import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './pages/roles/roles.component';
import { AddRoleComponent } from './pages/add-role/add-role.component';
import { UpdateRoleComponent } from './pages/update-role/update-role.component';
import { RoleComponent } from './pages/role/role.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { DashboardModule } from '../dashboard/dashboard.module';


@NgModule({
  declarations: [
    RolesComponent,
    AddRoleComponent,
    UpdateRoleComponent,
    RoleComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatTableExporterModule,
    ComponentsModule,
    SharedModule,
    MatSortModule,
    DashboardModule,
    RolesRoutingModule
  ]
})
export class RolesModule { }
