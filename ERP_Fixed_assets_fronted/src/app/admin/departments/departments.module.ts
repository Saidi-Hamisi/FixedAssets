import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { DepartmentComponent } from './pages/department/department.component';
import { AddDepartmentComponent } from './pages/add-department/add-department.component';
import { UpdateDepartmentComponent } from './pages/update-department/update-department.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDepartmentComponent } from './pages/delete-department/delete-department.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardModule } from '../dashboard/dashboard.module';


@NgModule({
  declarations: [
    DepartmentsComponent,
    DepartmentComponent,
    AddDepartmentComponent,
    UpdateDepartmentComponent,
    DeleteDepartmentComponent
  ],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableExporterModule,
    MatIconModule,
    SharedModule,
    ComponentsModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    DashboardModule,
    MatDialogModule
  ]
})
export class DepartmentsModule { }
