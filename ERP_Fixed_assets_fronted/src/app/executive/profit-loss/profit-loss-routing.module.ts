import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ExecutiveGuard } from "src/app/core/guard/executive.guard";
import { ProfitLossComponent } from "./pages/profit-loss/profit-loss.component";

const routes: Routes = [
  {
    path: "",
    //canActivate: [ExecutiveGuard],
    component: ProfitLossComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfitLossRoutingModule {}
