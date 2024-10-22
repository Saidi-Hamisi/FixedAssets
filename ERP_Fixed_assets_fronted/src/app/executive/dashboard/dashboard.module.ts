import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChartsModule as chartjsModule } from "ng2-charts";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NgApexchartsModule } from "ng-apexcharts";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "src/app/shared/shared.module";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { WidgetsModule } from "../widgets/widgets.module";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    chartjsModule,
    NgApexchartsModule,
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressBarModule,
    SharedModule,
    ComponentsModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    WidgetsModule,
    MatTableExporterModule,
    MatSelectModule,
  ],
})
export class DashboardModule {}
