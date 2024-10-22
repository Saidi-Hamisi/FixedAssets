import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClerkModule } from "./clerk.module";

const routes: Routes = [
  {
    path: "dashboard",
    //canLoad: [ClerkModule],
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  {
    path: "assets",
   // canLoad: [ClerkModule],
    loadChildren: () =>
      import("./assets/assets.module").then((m) => m.AssetsModule),
  },

  {
    path: "leases",
   // canLoad: [ClerkModule],
    loadChildren: () =>
      import("./lease/lease.module").then((m) => m.LeaseModule),
  },

  

  // {
  //   path: "accounts",
  //   loadChildren: () =>
  //     import("./accounts/accounts.module").then((m) => m.AccountsModule),
  // },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClerkRoutingModule {}
