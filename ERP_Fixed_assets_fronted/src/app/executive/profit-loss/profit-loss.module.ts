import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProfitLossRoutingModule } from "./profit-loss-routing.module";
import { ProfitLossComponent } from "./pages/profit-loss/profit-loss.component";
import { MatTableModule } from "@angular/material/table";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "src/app/shared/shared.module";
import { MatTableExporterModule } from "mat-table-exporter";
import { WidgetsModule } from "../widgets/widgets.module";

@NgModule({
  declarations: [ProfitLossComponent],
  imports: [
    CommonModule,
    ProfitLossRoutingModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatIconModule,
    WidgetsModule,
    ComponentsModule,
    SharedModule,
    MatTableExporterModule,
  ],
})
export class ProfitLossModule {}
