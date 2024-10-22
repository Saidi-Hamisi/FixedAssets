import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "src/app/core/guard/admin.guard";
import { AddAssetComponent } from "./pages/add-asset/add-asset.component";
import { AllAssetsComponent } from "./pages/all-assets/all-assets.component";
import { AssetDetailsComponent } from "./pages/asset-details/asset-details.component";
import { DepreciationComponent } from "./pages/asset-details/dialogs/depreciation/depreciation.component";
import { HistoryComponent } from "./pages/asset-details/dialogs/history/history/history.component";
import { MaintenanceComponent } from "./pages/asset-details/dialogs/maintenance/maintenance/maintenance.component";
import { VendorComponent } from "./pages/asset-details/dialogs/vendor/vendor/vendor.component";
import { EditAssetComponent } from "./pages/edit-asset/edit-asset.component";
import { ImportExcelComponent } from "./pages/import-excel/import-excel.component";
import { PendingAssetsComponent } from "./pages/pending-assets/pending-assets.component";
import { ProfitLossComponent } from "./pages/profit-loss/profit-loss.component";
import { ReportsFamsComponent } from "./pages/reports-fams/reports-fams.component";

const routes: Routes = [
  {
    path: "all",
    //canActivate: [AdminGuard], 
    component: AllAssetsComponent
  },
  {
    path: "add",
    //canActivate: [AdminGuard], 
    component: AddAssetComponent
  },
  {
    path: "details",
    //canActivate: [AdminGuard],
    component: AssetDetailsComponent,
  },
  {
    path: "pending",
    //canActivate: [AdminGuard],
    component: PendingAssetsComponent,
  },
  {
    path: "import",
    //canActivate: [AdminGuard],
    component: ImportExcelComponent,
  },

  {
    path: "vendor",
    //canActivate: [AdminGuard], 
    component: VendorComponent
  },
  {
    path: "maintenance",
    //canActivate: [AdminGuard],
    component: MaintenanceComponent,
  },
  {
    path: "history",
    //canActivate: [AdminGuard], 
    component: HistoryComponent
  },
  {
    path: "edit-asset",
    //canActivate: [AdminGuard],
    component: EditAssetComponent,
  },
  {
    path: "calc-depreciation",
    //canActivate: [AdminGuard],
    component: DepreciationComponent,
  },
  {
    path: "profit-loss",
    //canActivate: [AdminGuard],
    component: ProfitLossComponent,
  },
  {
    path: "reporting",
    //canActivate: [AdminGuard],
    component: ReportsFamsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetsRoutingModule { }
