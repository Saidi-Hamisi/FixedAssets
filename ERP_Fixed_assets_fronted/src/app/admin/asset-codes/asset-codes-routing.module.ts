import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AssetCodesComponent } from "./pages/asset-codes/asset-codes.component";

const routes: Routes = [
  {
    path: "",
    component: AssetCodesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetCodesRoutingModule {}
