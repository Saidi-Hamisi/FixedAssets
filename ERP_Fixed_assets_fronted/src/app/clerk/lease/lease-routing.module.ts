import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllLeasesComponent } from './all-leases/all-leases.component';
import { ManageLeasesComponent } from './manage-leases/manage-leases.component';
import { AllLessorsComponent } from './all-lessors/all-lessors.component';
import { ManageLessorsComponent } from './manage-lessors/manage-lessors.component';
import { LeaseDetailsComponent } from './lease-details/lease-details.component';
import { AccountingInfoComponent } from './accounting-info/accounting-info.component';
import { ReportingComponent } from './reporting/reporting.component';
import { LessorDetailsComponent } from './lessor-details/lessor-details.component';

const routes: Routes = [
  {
    path: "all-leases",
    //canActivate: [AdminGuard],
    component: AllLeasesComponent
  },
  {
    path: "manage-lease",
    //canActivate: [AdminGuard],
    component: ManageLeasesComponent
  },
  {
    path: "lease-details",
    //canActivate: [AdminGuard],
    component: LeaseDetailsComponent,
  },
  {
    path: "all-lessors",
    //canActivate: [AdminGuard],
    component: AllLessorsComponent
  },
  {
    path: "manage-lessor",
    //canActivate: [AdminGuard],
    component: ManageLessorsComponent
  },
  {
    path: "lessor-details",
    //canActivate: [AdminGuard],
    component: LessorDetailsComponent,
  },
  {
    path: "accounting",
    //canActivate: [AdminGuard],
    component: AccountingInfoComponent,
  },
  {
    path: "reporting",
    //canActivate: [AdminGuard],
    component: ReportingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaseRoutingModule { }
