import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/core/guard/admin.guard';
import { AddDepartmentComponent } from './pages/add-department/add-department.component';
import { DepartmentComponent } from './pages/department/department.component';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { UpdateDepartmentComponent } from './pages/update-department/update-department.component';

const routes: Routes = [
  {
    path: "",
    //canActivate: [AdminGuard], 
    component: DepartmentsComponent
  },
  {
    path: "add-department",
    //canActivate: [AdminGuard], 
    component: AddDepartmentComponent
  },
  {
    path: ":id",
    //canActivate: [AdminGuard], 
    component: DepartmentComponent
  },
  {
    path: ":id/update-department",
    //canActivate: [AdminGuard], 
    component: UpdateDepartmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
