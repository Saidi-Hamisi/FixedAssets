import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AssetMovementsRoutingModule } from "./asset-movements-routing.module";
import { AssetMovementsComponent } from "./pages/asset-movements/asset-movements.component";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "src/app/shared/shared.module";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { AddAssetMovementComponent } from "./pages/add-asset-movement/add-asset-movement.component";
import { MatDialogModule } from "@angular/material/dialog";
import { DashboardModule } from "../dashboard/dashboard.module";
import { MatTableModule } from "@angular/material/table";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { AssetMovementDetailsComponent } from './pages/asset-movement-details/asset-movement-details.component';
import { UpdateAssetMovementComponent } from './pages/update-asset-movement/update-asset-movement.component';
import { DeleteAssetMovementComponent } from './pages/delete-asset-movement/delete-asset-movement.component';

@NgModule({
  declarations: [AssetMovementsComponent, AddAssetMovementComponent, AssetMovementDetailsComponent, UpdateAssetMovementComponent, DeleteAssetMovementComponent],
  imports: [
    CommonModule,
    AssetMovementsRoutingModule,
    ComponentsModule,
    SharedModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    DashboardModule,
    MatTableModule,
    MatTableExporterModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
  ],
})
export class AssetMovementsModule {}
