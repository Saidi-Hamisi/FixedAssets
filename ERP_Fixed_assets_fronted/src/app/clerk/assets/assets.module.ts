import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";

import { AssetsRoutingModule } from "./assets-routing.module";
import { AllAssetsComponent } from "./pages/all-assets/all-assets.component";
import { AssetDetailsComponent } from "./pages/asset-details/asset-details.component";
import { AddAssetComponent } from "./pages/add-asset/add-asset.component";
import { PendingAssetsComponent } from "./pages/pending-assets/pending-assets.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SharedModule } from "src/app/shared/shared.module";

import { ChartsModule as chartjsModule } from "ng2-charts";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgApexchartsModule } from "ng-apexcharts";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSortModule } from "@angular/material/sort";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCheckboxModule } from "@angular/material/checkbox";

import { MatTabsModule } from "@angular/material/tabs";

import { MatTableExporterModule } from "mat-table-exporter";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AddVendorComponent } from "./pages/asset-details/dialogs/vendor/dialogs/add-vendor/add-vendor.component";
import { ImportExcelComponent } from "./pages/import-excel/import-excel.component";
import { RevaluateComponent } from './pages/asset-details/actions/revaluate/revaluate.component';
import { TransferComponent } from './pages/asset-details/actions/transfer/transfer.component';
import { DisposeComponent } from './pages/asset-details/actions/dispose/dispose.component';
import { WriteOffComponent } from './pages/asset-details/actions/write-off/write-off.component';
import { AddWorkComponent } from './pages/asset-details/dialogs/work/add-work/add-work.component';
import { UpdateWorkComponent } from './pages/asset-details/dialogs/work/update-work/update-work.component';
import { ViewWorkComponent } from './pages/asset-details/dialogs/work/view-work/view-work.component';
import { AddWarrantyComponent } from './pages/asset-details/dialogs/warranty/add-warranty/add-warranty.component';
import { UpdateWarrantyComponent } from './pages/asset-details/dialogs/warranty/update-warranty/update-warranty.component';
import { ViewWarrantyComponent } from './pages/asset-details/dialogs/warranty/view-warranty/view-warranty.component';
import { ViewInsuranceComponent } from './pages/asset-details/dialogs/insurance/view-insurance/view-insurance.component';
import { AddInsuranceComponent } from './pages/asset-details/dialogs/insurance/add-insurance/add-insurance.component';
import { UpdateInsuranceComponent } from './pages/asset-details/dialogs/insurance/update-insurance/update-insurance.component';
import { VendorComponent } from './pages/asset-details/dialogs/vendor/vendor/vendor.component';
import { MaintenanceComponent } from "./pages/asset-details/dialogs/maintenance/maintenance/maintenance.component";
import { DeleteVendorComponent } from './pages/asset-details/dialogs/vendor/dialogs/delete-vendor/delete-vendor.component';
import { UpdateVendorComponent } from './pages/asset-details/dialogs/vendor/dialogs/update-vendor/update-vendor.component';
import { DeleteMaintenanceComponent } from './pages/asset-details/dialogs/maintenance/dialogs/delete-maintenance/delete-maintenance.component';
import { AddMaintenanceComponent } from './pages/asset-details/dialogs/maintenance/dialogs/add-maintenance/add-maintenance.component';
import { UpdateMaintenanceComponent } from './pages/asset-details/dialogs/maintenance/dialogs/update-maintenance/update-maintenance.component';
import { QRCodeModule } from 'angularx-qrcode';
import { QrCodeComponent } from './pages/asset-details/dialogs/qr-code/qr-code.component';
import { HistoryComponent } from './pages/asset-details/dialogs/history/history/history.component';
import { DeleteHistoryComponent } from './pages/asset-details/dialogs/history/dialogs/delete-history/delete-history.component';
import { EditAssetComponent } from './pages/edit-asset/edit-asset.component';
import { DepreciationComponent } from './pages/asset-details/dialogs/depreciation/depreciation.component';
import { ProfitLossComponent } from './pages/profit-loss/profit-loss.component';
import { WidgetsComponent } from './dashboard/widgets/widgets.component';
import { PendingDetailsComponent } from './pages/pending-assets/pending-details/pending-details.component';
import {MatCardModule} from '@angular/material/card';
import { ReportsFamsComponent } from './pages/reports-fams/reports-fams.component';
import { ReportLookupComponent } from './pages/reports-fams/dialogs/report-lookup/report-lookup.component';
import { BarCodeComponent } from './pages/asset-details/dialogs/bar-code/bar-code.component';




@NgModule({
  declarations: [
    AllAssetsComponent,
    AssetDetailsComponent,
    AddAssetComponent,
    PendingAssetsComponent,
    DashboardComponent,
    AddVendorComponent,
    ImportExcelComponent,
    RevaluateComponent,
    TransferComponent,
    DisposeComponent,
    WriteOffComponent,
    AddWorkComponent,
    UpdateWorkComponent,
    ViewWorkComponent,
    AddWarrantyComponent,
    UpdateWarrantyComponent,
    ViewWarrantyComponent,
    ViewInsuranceComponent,
    AddInsuranceComponent,
    UpdateInsuranceComponent,
    VendorComponent,
    MaintenanceComponent,
    DeleteVendorComponent,
    UpdateVendorComponent,
    DeleteMaintenanceComponent,
    AddMaintenanceComponent,
    UpdateMaintenanceComponent,
    QrCodeComponent,
    HistoryComponent,
    DeleteHistoryComponent,
    EditAssetComponent,
    DepreciationComponent,
    ProfitLossComponent,
    WidgetsComponent,
    PendingDetailsComponent,
    ReportsFamsComponent,
    ReportLookupComponent,
    BarCodeComponent,
  
    
  ],
  imports: [
    CommonModule,
    AssetsRoutingModule,
    MatButtonModule,
    MatIconModule,
    chartjsModule,
    NgApexchartsModule,
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressBarModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatMenuModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTabsModule,
    MatCheckboxModule,
    MatTableExporterModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    ComponentsModule,
    SharedModule,
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatMenuModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTabsModule,
    MatCheckboxModule,
    MatTableExporterModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    ComponentsModule,
    SharedModule,
    QRCodeModule,
    MatCardModule
    
    
    
  ],
  exports:[WidgetsComponent],
  providers: [DatePipe]
})
export class AssetsModule {}
