import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "./authentication/page404/page404.component";
import { AdminGuard } from "./core/guard/admin.guard";
import { AuthGuard } from "./core/guard/auth.guard";
import { ClerkGuard } from "./core/guard/clerk.guard";
import { ExecutiveGuard } from "./core/guard/executive.guard";
import { SupervisorGuard } from "./core/guard/supervisor.guard";
import { Role } from "./core/models/role";
import { AuthLayoutComponent } from "./layout/app-layout/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./layout/app-layout/main-layout/main-layout.component";
const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "/authentication/signin", pathMatch: "full" },
      // {
      //   path: "admin",
      //   canActivate: [AuthGuard],
      //   data: {
      //     role: Role.Admin,
      //   },
      //   loadChildren: () =>
      //     import("./admin/admin.module").then((m) => m.AdminModule),
      // },

      // Main routes
      {
        path: "clerk",
        // canLoad: [ClerkGuard],
        loadChildren: () =>
          import("./clerk/clerk.module").then((m) => m.ClerkModule),
      },
      {
        path: "admin",
        // canLoad: [AdminGuard],
        loadChildren: () =>
          import("./admin/admin.module").then((m) => m.AdminModule),
      },
      {
        path: "executive",
        // canLoad: [ExecutiveGuard],
        loadChildren: () =>
          import("./executive/executive.module").then((m) => m.ExecutiveModule),
      },
      {
        path: "supervisor",
        // canLoad: [SupervisorGuard],
        loadChildren: () =>
          import("./supervisor/supervisor.module").then(
            (m) => m.SupervisorModule
          ),
      },
      {
        path: "account",
        loadChildren: () =>
          import("./account/account.module").then((m) => m.AccountModule),
      },
    ],
  },
  {
    path: "authentication",
    component: AuthLayoutComponent,
    loadChildren: () =>
      import("./authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
  },

  { path: "page-not-found", component: Page404Component },

  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
