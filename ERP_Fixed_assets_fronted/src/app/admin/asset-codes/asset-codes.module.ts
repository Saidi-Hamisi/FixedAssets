import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AssetCodesRoutingModule } from "./asset-codes-routing.module";
import { AssetCodesComponent } from "./pages/asset-codes/asset-codes.component";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "src/app/shared/shared.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  declarations: [AssetCodesComponent],
  imports: [
    CommonModule,
    AssetCodesRoutingModule,
    ComponentsModule,
    SharedModule,
    MatFormFieldModule,
    MatSelectModule
  ],
})
export class AssetCodesModule {}
