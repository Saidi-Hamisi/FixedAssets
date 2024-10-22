import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaseRoutingModule } from './lease-routing.module';
import { AllLeasesComponent } from './all-leases/all-leases.component';
import { ManageLeasesComponent } from './manage-leases/manage-leases.component';
import { AllLessorsComponent } from './all-lessors/all-lessors.component';
import { ManageLessorsComponent } from './manage-lessors/manage-lessors.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QRCodeModule } from 'angularx-qrcode';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssetsRoutingModule } from '../assets/assets-routing.module';
import { FilesService } from 'src/app/shared/custom-components/fileconversion/files.service';
import { MatStepperModule } from "@angular/material/stepper";
import { AssetsModule } from "../assets/assets.module";
import { LeaseDetailsComponent } from './lease-details/lease-details.component';
import { AccountingInfoComponent } from './accounting-info/accounting-info.component';
import { ReportingComponent } from './reporting/reporting.component';
import { LessorsLookupComponent } from './lookups/lessors-lookup/lessors-lookup.component';
import { LeasesLookupComponent } from './lookups/leases-lookup/leases-lookup.component';
import { LessorDetailsComponent } from './lessor-details/lessor-details.component';
import { AssetsLookupComponent } from './lookups/assets-lookup/assets-lookup.component';
import { CategoryLookupComponent } from './lookups/category-lookup/category-lookup.component';
import { DepartmentLookupComponent } from './lookups/department-lookup/department-lookup.component';
import { CustodianLookupComponent } from './lookups/custodian-lookup/custodian-lookup.component';
import { LocationLookupComponent } from './lookups/location-lookup/location-lookup.component';


@NgModule({
    declarations: [
        AllLeasesComponent,
        ManageLeasesComponent,
        AllLessorsComponent,
        ManageLessorsComponent,
        LeaseDetailsComponent,
        AccountingInfoComponent,
        ReportingComponent,
        LessorsLookupComponent,
        LeasesLookupComponent,
        LessorDetailsComponent,
        AssetsLookupComponent,
        CategoryLookupComponent,
        DepartmentLookupComponent,
        CustodianLookupComponent,
        LocationLookupComponent
    ],
    providers: [FilesService],
    imports: [
        CommonModule,
        LeaseRoutingModule,
        MatButtonModule,
        MatIconModule,
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
        MatCardModule,
        MatStepperModule,
        AssetsModule
    ]
})
export class LeaseModule { }
