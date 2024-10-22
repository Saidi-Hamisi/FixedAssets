import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from './pages/locations/locations.component';
import { LocationComponent } from './pages/location/location.component';
import { AddLocationComponent } from './pages/add-location/add-location.component';
import { UpdateLocationComponent } from './pages/update-location/update-location.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteLocationComponent } from './pages/delete-location/delete-location.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardModule } from '../dashboard/dashboard.module';


@NgModule({
  declarations: [
    LocationsComponent,
    LocationComponent,
    AddLocationComponent,
    UpdateLocationComponent,
    DeleteLocationComponent
  ],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    ComponentsModule,
    SharedModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    DashboardModule,
    MatTableExporterModule
  ]
})
export class LocationsModule { }
