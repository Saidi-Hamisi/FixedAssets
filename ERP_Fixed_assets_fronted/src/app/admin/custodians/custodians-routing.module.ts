import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "src/app/core/guard/admin.guard";
import { AddCustodianComponent } from "./pages/add-custodian/add-custodian.component";
import { CustodianComponent } from "./pages/custodian/custodian.component";
import { CustodiansComponent } from "./pages/custodians/custodians.component";
import { UpdateCustodianComponent } from "./pages/update-custodian/update-custodian.component";

const routes: Routes = [
  {
    path: "",
    //canActivate: [AdminGuard], 
    component: CustodiansComponent,
  },
  {
    path: "add-custodian",
    //canActivate: [AdminGuard], 
    component: AddCustodianComponent,
  },
  {
    path: ":id",
    //canActivate: [AdminGuard], 
    component: CustodianComponent,
  },
  {
    path: "id/update-custodian",
    //canActivate: [AdminGuard], 
    component: UpdateCustodianComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustodiansRoutingModule {}
