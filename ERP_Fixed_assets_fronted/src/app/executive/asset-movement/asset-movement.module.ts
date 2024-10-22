import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AssetMovementRoutingModule } from "./asset-movement-routing.module";
import { AssetMovementComponent } from "./pages/asset-movement/asset-movement.component";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "src/app/shared/shared.module";
import { MatMenuModule } from "@angular/material/menu";
import { WidgetsModule } from "../widgets/widgets.module";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [AssetMovementComponent],
  imports: [
    CommonModule,
    AssetMovementRoutingModule,
    ComponentsModule,
    SharedModule,
    MatMenuModule,
    WidgetsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableExporterModule,
    MatProgressSpinnerModule,
  ],
})
export class AssetMovementModule {}
