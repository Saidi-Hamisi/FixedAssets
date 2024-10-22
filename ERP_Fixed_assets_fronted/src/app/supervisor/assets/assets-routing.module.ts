import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SupervisorGuard } from "src/app/core/guard/supervisor.guard";
import { AllAssetsComponent } from "./pages/all-assets/all-assets.component";
import { SingleAssetComponent } from "./pages/all-assets/single-asset/single-asset.component";
import { AssetAnalysisComponent } from "./pages/asset-analysis/asset-analysis.component";

const routes: Routes = [
  { path: "all-assets", 
  // canActivate: [SupervisorGuard],
   component: AllAssetsComponent },
  { path: "asset-analysis", 
  // canActivate: [SupervisorGuard], 
  component: AssetAnalysisComponent },
  { path: "single-asset", 
  // canActivate: [SupervisorGuard], 
  component: SingleAssetComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetsRoutingModule {}
