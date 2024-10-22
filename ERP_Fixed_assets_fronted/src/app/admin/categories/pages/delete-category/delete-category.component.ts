import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { CustodiansComponent } from "src/app/admin/custodians/pages/custodians/custodians.component";
import { CategoryService } from "src/app/admin/data/services/category.service";
import { Category } from "src/app/admin/data/types/category";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

@Component({
  selector: "app-delete-category",
  templateUrl: "./delete-category.component.html",
  styleUrls: ["./delete-category.component.sass"],
})
export class DeleteCategoryComponent extends BaseComponent implements OnInit {
  category: Category;
  categoryId: number;

  constructor(
    public dialogRef: MatDialogRef<CustodiansComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private categoryService: CategoryService
  ) {
    super();
  }

  ngOnInit(): void {
    this.category = this.data.category;
    //console.log(this.custodian);
    this.categoryId = this.category.id;
  }

  deleteCategory() {
    this.categoryService
      .deleteCategory(this.categoryId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification("snackbar-success", res.message);
          this.dialogRef.close();
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
