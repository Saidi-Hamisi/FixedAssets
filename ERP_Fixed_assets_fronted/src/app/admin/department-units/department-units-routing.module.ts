import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "src/app/core/guard/admin.guard";
import { AddDepartmentUnitComponent } from "./pages/add-department-unit/add-department-unit.component";
import { DepartmentUnitComponent } from "./pages/department-unit/department-unit.component";
import { DepartmentUnitsComponent } from "./pages/department-units/department-units.component";
import { UpdateDepartmentUnitComponent } from "./pages/update-department-unit/update-department-unit.component";

const routes: Routes = [
  {
    path: "",
    //canActivate: [AdminGuard], 
    component: DepartmentUnitsComponent,
  },
  {
    path: "add-department",
    //canActivate: [AdminGuard], 
    component: AddDepartmentUnitComponent,
  },
  {
    path: ":id",
    //canActivate: [AdminGuard], 
    component: DepartmentUnitComponent,
  },
  {
    path: ":id/update-department-unit",
    //canActivate: [AdminGuard], 
    component: UpdateDepartmentUnitComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentUnitsRoutingModule {}
