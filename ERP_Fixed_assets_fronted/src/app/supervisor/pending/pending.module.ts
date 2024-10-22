import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingRoutingModule } from './pending-routing.module';
import { PendingComponent } from './pending/pending.component';

import { ChartsModule as chartjsModule } from "ng2-charts";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgApexchartsModule } from "ng-apexcharts";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RejectComponent } from './dialogs/reject/reject.component';
import { ApproveComponent } from './dialogs/approve/approve.component';
import { MatDialogModule } from '@angular/material/dialog';
import { WidgetsComponent } from '../dashboard/widgets/widgets.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { PendingDetailsComponent } from './pending-details/pending-details.component';




@NgModule({
  declarations: [
    PendingComponent,
    RejectComponent,
    ApproveComponent,
    PendingDetailsComponent,
   
  ],
  imports: [
    CommonModule,
    PendingRoutingModule,
    CommonModule,
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressBarModule,
    ComponentsModule,
    SharedModule,
    MatTableModule,
    MatTableExporterModule,
    MatPaginatorModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    DashboardModule
  ]
})
export class PendingModule { }
