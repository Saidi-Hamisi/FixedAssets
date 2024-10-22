import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { CategoryService } from "src/app/admin/data/services/category.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { CategoriesComponent } from "../categories/categories.component";

@Component({
  selector: "app-add-category",
  templateUrl: "./add-category.component.html",
  styleUrls: ["./add-category.component.sass"],
})
export class AddCategoryComponent extends BaseComponent implements OnInit {
  action: string;
  dialogTitle: string;
  categoryForm: FormGroup;

  depreciations = [
     "Straight line method",
    "Reducing balance method",
  ];

  constructor(
    public dialogRef: MatDialogRef<CategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private snackbar: SnackbarService
  ) {
    super();
  }

  ngOnInit(): void {
    this.categoryForm = this.createCategoryForm();
  }

  createCategoryForm(): FormGroup {
    return this.fb.group({
      categoryName: ["", [Validators.required]],
      depreciation_type: ["", [Validators.required]],
      depreciation_rate: ["", [Validators.required]],
    });
  }

  addCategory() {
    this.categoryService
      .addCategory(this.categoryForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification('snackbar-success', res.message)
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
