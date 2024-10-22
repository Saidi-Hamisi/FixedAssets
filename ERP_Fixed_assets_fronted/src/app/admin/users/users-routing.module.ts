import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/core/guard/admin.guard';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { DeletedAccountsComponent } from './pages/deleted-accounts/deleted-accounts.component';
import { InactiveAccountsComponent } from './pages/inactive-accounts/inactive-accounts.component';
import { LockedAccountsComponent } from './pages/locked-accounts/locked-accounts.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { UserLogsComponent } from './pages/user-logs/user-logs.component';
import { UserComponent } from './pages/user/user.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: "all",
    //canActivate: [AdminGuard], 
    component: UsersComponent
  },
  {
    path:"locked-accounts",
    //canActivate: [AdminGuard], 
    component: LockedAccountsComponent
  },
  {
    path: "deleted-accounts",
    //canActivate: [AdminGuard], 
    component: DeletedAccountsComponent
  },
  {
    path: "inactive-accounts",
    //canActivate: [AdminGuard], 
    component: InactiveAccountsComponent
  },
  {
    path: "add-user",
    //canActivate: [AdminGuard], 
    component: AddUserComponent
  },
  {
    path: ":id",
    //canActivate: [AdminGuard], 
    component: UserComponent
  },
  {
    path: ":id/update-user",
    //canActivate: [AdminGuard], 
    component: UpdateUserComponent
  },
  {
    path: "user-logs/:id",
    //canActivate: [AdminGuard], 
    component: UserLogsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
