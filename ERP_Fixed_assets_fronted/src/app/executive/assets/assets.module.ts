import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AssetsRoutingModule } from "./assets-routing.module";
import { AssetsComponent } from "./assets/assets.component";
import { CategoryAssetsComponent } from "./category-assets/category-assets.component";
import { DepartmentUnitAssetsComponent } from "./department-unit-assets/department-unit-assets.component";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule } from "@angular/material/dialog";
import { SharedModule } from "src/app/shared/shared.module";
import { MatMenuModule } from "@angular/material/menu";
import { MatTableExporterModule } from "mat-table-exporter";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { WidgetsModule } from "../widgets/widgets.module";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AssetDetailsComponent } from './asset-details/asset-details.component';

@NgModule({
  declarations: [
    AssetsComponent,
    CategoryAssetsComponent,
    DepartmentUnitAssetsComponent,
    AssetDetailsComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSelectModule,
    AssetsRoutingModule,
    MatPaginatorModule,
    MatSortModule,
    SharedModule,
    MatMenuModule,
    MatTableExporterModule,
    ComponentsModule,
    WidgetsModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
})
export class AssetsModule {}
