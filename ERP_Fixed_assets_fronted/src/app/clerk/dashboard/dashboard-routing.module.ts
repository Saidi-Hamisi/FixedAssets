import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClerkGuard } from 'src/app/core/guard/clerk.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: "", 
  //canActivate: [ClerkGuard], 
  component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
