import { NgModule } from "@angular/core";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { SharedModule } from "../shared.module";
import { BaseComponent } from './base/base.component';
import { ExcelUploadComponent } from './excel-upload/excel-upload.component';


@NgModule({
  declarations: [FileUploadComponent, BreadcrumbComponent, BaseComponent, ExcelUploadComponent],
  imports: [SharedModule],
  exports: [FileUploadComponent, BreadcrumbComponent, ExcelUploadComponent],
})
export class ComponentsModule {}
