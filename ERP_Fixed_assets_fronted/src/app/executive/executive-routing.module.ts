import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ExecutiveGuard } from "../core/guard/executive.guard";

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
      import("./transactions/transactions.module").then(
        (m) => m.TransactionsModule
      ),
  },
  {
    path: "assets",
    //canLoad: [ExecutiveGuard],
    loadChildren: () =>
      import("./assets/assets.module").then((m) => m.AssetsModule),
  },
  {
    path: "profit-loss",
    //canLoad: [ExecutiveGuard],
    loadChildren: () =>
      import("./profit-loss/profit-loss.module").then(
        (m) => m.ProfitLossModule
      ),
  },
  {
    path: "asset-movement",
    //canLoad: [ExecutiveGuard],
    loadChildren: () =>
      import("./asset-movement/asset-movement.module").then(
        (m) => m.AssetMovementModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExecutiveRoutingModule {}
