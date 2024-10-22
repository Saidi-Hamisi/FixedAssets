import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExecutiveGuard } from 'src/app/core/guard/executive.guard';
import { AssetDetailsComponent } from './asset-details/asset-details.component';
import { AssetsComponent } from './assets/assets.component';

const routes: Routes = [
  {
    path: "",
    //canActivate: [ExecutiveGuard],
    component: AssetsComponent
  },
  {
    path: ":id",
    //canActivate: [ExecutiveGuard],
    component: AssetDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetsRoutingModule { }
