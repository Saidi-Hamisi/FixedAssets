import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "src/app/core/guard/admin.guard";
import { AddCategoryComponent } from "./pages/add-category/add-category.component";
import { CategoriesComponent } from "./pages/categories/categories.component";
import { UpdateCategoryComponent } from "./pages/update-category/update-category.component";

const routes: Routes = [
  { path: "", 
  //canActivate: [AdminGuard], 
  component: CategoriesComponent },
  { path: "add-category", 
  //canActivate: [AdminGuard], 
  component: AddCategoryComponent },
  { path: ":id", 
  //canActivate: [AdminGuard], 
  component: UpdateCategoryComponent },
  { path: ":id/update-category", 
  //canActivate: [AdminGuard], 
  component: UpdateCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
