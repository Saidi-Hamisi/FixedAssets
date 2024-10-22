import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExecutiveGuard } from 'src/app/core/guard/executive.guard';
import { AssetMovementComponent } from './pages/asset-movement/asset-movement.component';

const routes: Routes = [
  {
    path: "",
    //canActivate: [ExecutiveGuard],
    component: AssetMovementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetMovementRoutingModule { }
