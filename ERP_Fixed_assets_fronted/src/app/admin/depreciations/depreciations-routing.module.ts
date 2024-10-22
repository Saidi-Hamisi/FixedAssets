import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/core/guard/admin.guard';
import { DepreciationsComponent } from './pages/depreciations/depreciations.component';

const routes: Routes = [
  {
    path: "",
    //canActivate: [AdminGuard], 
    component: DepreciationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepreciationsRoutingModule { }
