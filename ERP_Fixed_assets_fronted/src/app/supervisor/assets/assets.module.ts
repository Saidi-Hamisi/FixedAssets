import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AssetsRoutingModule } from "./assets-routing.module";
import { AllAssetsComponent } from "./pages/all-assets/all-assets.component";
import { AssetAnalysisComponent } from "./pages/asset-analysis/asset-analysis.component";

import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "src/app/shared/shared.module";
import { MatTableModule } from "@angular/material/table";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { DashboardModule } from "../dashboard/dashboard.module";
import { ByDepartmentComponent } from "./pages/asset-analysis/by-department/by-department.component";
import { ByLocationComponent } from "./pages/asset-analysis/by-location/by-location.component";
import { ByCategoriesComponent } from "./pages/asset-analysis/by-categories/by-categories.component";
import { ByCustodiansComponent } from "./pages/asset-analysis/by-custodians/by-custodians.component";
import { SingleAssetComponent } from "./pages/all-assets/single-asset/single-asset.component";
import { SortCategoriesComponent } from "./pages/asset-analysis/sort-categories/sort-categories.component";

import { NgxEchartsModule } from "ngx-echarts";
import { ChartsModule as chartjsModule } from "ng2-charts";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { NgApexchartsModule } from "ng-apexcharts";
import { ByCatComponent } from './pages/asset-analysis/asset-charts/by-cat/by-cat.component';

@NgModule({
  declarations: [
    AllAssetsComponent,
    AssetAnalysisComponent,
    ByDepartmentComponent,
    ByLocationComponent,
    ByCategoriesComponent,
    ByCustodiansComponent,
    SingleAssetComponent,
    SortCategoriesComponent,
    ByCatComponent,
  ],
  imports: [
    CommonModule,
    AssetsRoutingModule,
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
    DashboardModule,
    CommonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),
    }),
    chartjsModule,
    NgxChartsModule,
    NgApexchartsModule,
  ],
})
export class AssetsModule {}
