import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentUnitsRoutingModule } from './department-units-routing.module';
import { DepartmentUnitsComponent } from './pages/department-units/department-units.component';
import { AddDepartmentUnitComponent } from './pages/add-department-unit/add-department-unit.component';
import { UpdateDepartmentUnitComponent } from './pages/update-department-unit/update-department-unit.component';
import { DepartmentUnitComponent } from './pages/department-unit/department-unit.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { DeleteDepartmentUnitComponent } from './pages/delete-department-unit/delete-department-unit.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardModule } from '../dashboard/dashboard.module';


@NgModule({
  declarations: [
    DepartmentUnitsComponent,
    AddDepartmentUnitComponent,
    UpdateDepartmentUnitComponent,
    DepartmentUnitComponent,
    DeleteDepartmentUnitComponent
  ],
  imports: [
    CommonModule,
    DepartmentUnitsRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableExporterModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    SharedModule,
    ComponentsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTabsModule,
    DashboardModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ]
})
export class DepartmentUnitsModule { }
