import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/core/guard/admin.guard';
import { AddRoleComponent } from './pages/add-role/add-role.component';
import { RolesComponent } from './pages/roles/roles.component';
// import { RolesModule } from './roles.module';

const routes: Routes = [
  {
    path: "all",
    //canActivate: [AdminGuard], 
    component: RolesComponent
  },
  {
    path: "add-role",
    //canActivate: [AdminGuard], 
    component: AddRoleComponent
  },
  // {
  //   path: ":id",
  //   component: RolesModule
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
