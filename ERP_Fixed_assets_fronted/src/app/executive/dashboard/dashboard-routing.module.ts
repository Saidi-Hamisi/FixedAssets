import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExecutiveGuard } from 'src/app/core/guard/executive.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:"", 
  //canActivate: [ExecutiveGuard], 
  component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
