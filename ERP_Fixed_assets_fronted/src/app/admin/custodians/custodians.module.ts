import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustodiansRoutingModule } from './custodians-routing.module';
import { CustodiansComponent } from './pages/custodians/custodians.component';
import { CustodianComponent } from './pages/custodian/custodian.component';
import { AddCustodianComponent } from './pages/add-custodian/add-custodian.component';
import { UpdateCustodianComponent } from './pages/update-custodian/update-custodian.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { DeleteCustodianComponent } from './pages/delete-custodian/delete-custodian.component';
import { CdkColumnDef } from '@angular/cdk/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardModule } from '../dashboard/dashboard.module';


@NgModule({
  declarations: [
    CustodiansComponent,
    CustodianComponent,
    AddCustodianComponent,
    UpdateCustodianComponent,
    DeleteCustodianComponent
  ],
  imports: [
    CommonModule,
    CustodiansRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatOptionModule,
    ComponentsModule,
    SharedModule,
    MatMenuModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableExporterModule,
    MatDialogModule,
    MatDatepickerModule,
    MatIconModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    DashboardModule
  ],
  providers:[CdkColumnDef]
})
export class CustodiansModule { }
