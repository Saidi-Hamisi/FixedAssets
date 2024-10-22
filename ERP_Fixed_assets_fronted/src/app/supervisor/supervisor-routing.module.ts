import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupervisorGuard } from '../core/guard/supervisor.guard';

const routes: Routes = [
  {
    path: "dashboard",
    //canLoad: [ExecutiveGuard],
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  {
    path: "transactions",
    //canLoad: [ExecutiveGuard],
    loadChildren: () =>
      import("./transactions/transactions.module").then((m) => m.TransactionsModule),
  },
  {
    path: "assets",
    // canLoad: [SupervisorGuard],
    loadChildren: () =>
      import("./assets/assets.module").then((m) => m.AssetsModule),
  },
  {
    path: "pending",
    //canLoad: [ExecutiveGuard],
    loadChildren: () =>
      import("./pending/pending.module").then((m) => m.PendingModule),
  },
  // {
  //   path: "accounts",
  //   loadChildren: () =>
  //     import("./accounts/accounts.module").then((m) => m.AccountsModule),
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisorRoutingModule { }
