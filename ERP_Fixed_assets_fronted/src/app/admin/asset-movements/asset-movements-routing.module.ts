import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetMovementsComponent } from './pages/asset-movements/asset-movements.component';

const routes: Routes = [
  {
    path: "",
    component: AssetMovementsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetMovementsRoutingModule { }
