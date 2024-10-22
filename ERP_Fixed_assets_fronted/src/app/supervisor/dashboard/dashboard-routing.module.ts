import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupervisorGuard } from 'src/app/core/guard/supervisor.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:"", 
  //canActivate: [SupervisorGuard], 
  component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
