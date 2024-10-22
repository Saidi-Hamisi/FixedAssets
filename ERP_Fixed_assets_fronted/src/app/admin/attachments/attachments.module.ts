import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AttachmentsRoutingModule } from "./attachments-routing.module";
import { AttachmentsComponent } from "./pages/attachments/attachments.component";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { SharedModule } from "src/app/shared/shared.module";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { MatTableExporterModule } from "mat-table-exporter";
import { DashboardModule } from "../dashboard/dashboard.module";
import { AddAttachmentComponent } from './pages/add-attachment/add-attachment.component';
import { UpdateAttachmentComponent } from './pages/update-attachment/update-attachment.component';
import { MatDialogModule } from "@angular/material/dialog";
import { DeleteAttachmentComponent } from './pages/delete-attachment/delete-attachment.component';

@NgModule({
  declarations: [AttachmentsComponent, AddAttachmentComponent, UpdateAttachmentComponent, DeleteAttachmentComponent],
  imports: [
    CommonModule,
    AttachmentsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    SharedModule,
    MatTableExporterModule,
    ComponentsModule,
    DashboardModule,
    MatDialogModule
  ],
})
export class AttachmentsModule {}
