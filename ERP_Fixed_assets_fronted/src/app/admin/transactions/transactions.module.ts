import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DatePipe } from "@angular/common";

import { TransactionsRoutingModule } from "./transactions-routing.module";
import { TransactionsComponent } from "./pages/transactions/transactions.component";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatSortModule } from "@angular/material/sort";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "src/app/shared/shared.module";
import { DashboardModule } from "../dashboard/dashboard.module";

@NgModule({
  declarations: [TransactionsComponent],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatTableExporterModule,
    MatSortModule,
    DashboardModule,
    ComponentsModule,
    SharedModule
  ],
  providers: [DatePipe],
})
export class TransactionsModule {}
