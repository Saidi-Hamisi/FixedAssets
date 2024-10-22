import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UpdatePasswordComponent } from "./pages/update-password/update-password.component";
import { UpdateProfileComponent } from "./pages/update-profile/update-profile.component";
import { NotificationsComponent } from "./pages/notifications/notifications.component";

const routes: Routes = [
  {
    path: "update-password",
    component: UpdatePasswordComponent,
  },
  { path: "update-profile", component: UpdateProfileComponent },
  { path: "notifications", component: NotificationsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
