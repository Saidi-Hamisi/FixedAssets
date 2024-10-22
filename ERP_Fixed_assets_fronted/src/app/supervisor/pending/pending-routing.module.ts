import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SupervisorGuard } from "src/app/core/guard/supervisor.guard";
import { PendingDetailsComponent } from "./pending-details/pending-details.component";
import { PendingComponent } from "./pending/pending.component";

const routes: Routes = [
  { path: "pending", 
  //canActivate: [SupervisorGuard], 
  component: PendingComponent },
  { path: "pending-details",
   //canActivate: [SupervisorGuard], 
   component: PendingDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingRoutingModule {}
