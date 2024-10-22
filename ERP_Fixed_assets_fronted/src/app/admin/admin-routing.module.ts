import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "../core/guard/admin.guard";

const routes: Routes = [
  {
    path: "dashboard",
    // canLoad: [AdminGuard],
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  {
    path: "account",
    // canLoad: [AdminGuard],
    loadChildren: () =>
      import("./account/account.module").then((m) => m.AccountModule),
  },
  {
    path: "categories",
    // canLoad: [AdminGuard],
    loadChildren: () =>
      import("./categories/categories.module").then((m) => m.CategoriesModule),
  },
  {
    path: "custodians",
    // canLoad: [AdminGuard],
    loadChildren: () =>
      import("./custodians/custodians.module").then((m) => m.CustodiansModule),
  },
  {
    path: "department-units",
    // canLoad: [AdminGuard],
    loadChildren: () =>
      import("./department-units/department-units.module").then(
        (m) => m.DepartmentUnitsModule
      ),
  },
  {
    path: "departments",
    // canLoad: [AdminGuard],
    loadChildren: () =>
      import("./departments/departments.module").then(
        (m) => m.DepartmentsModule
      ),
  },
  {
    path: "depreciations",
    // canLoad: [AdminGuard],
    loadChildren: () =>
      import("./depreciations/depreciations.module").then(
        (m) => m.DepreciationsModule
      ),
  },
  {
    path: "locations",
    // canLoad: [AdminGuard],
    loadChildren: () =>
      import("./locations/locations.module").then((m) => m.LocationsModule),
  },
  {
    path: "roles",
    // canLoad: [AdminGuard],
    loadChildren: () =>
      import("./roles/roles.module").then((m) => m.RolesModule),
  },
  {
    path: "users",
    // canLoad: [AdminGuard],
    loadChildren: () =>
      import("./users/users.module").then((m) => m.UsersModule),
  },
  {
    path: "transactions",
    // canLoad: [AdminGuard],
    loadChildren: () =>
      import("./transactions/transactions.module").then(
        (m) => m.TransactionsModule
      ),
  },
  {
    path: "asset-movements",
    // canLoad: [AdminGuard],
    loadChildren: () =>
      import("./asset-movements/asset-movements.module").then(
        (m) => m.AssetMovementsModule
      ),
  },
  {
    path: "asset-codes",
    // canLoad: [AdminGuard],
    loadChildren: () =>
      import("./asset-codes/asset-codes.module").then(
        (m) => m.AssetCodesModule
      ),
  },
  {
    path: "attachments",
    // canLoad: [AdminGuard],
    loadChildren: () =>
      import("./attachments/attachments.module").then(
        (m) => m.AttachmentsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
