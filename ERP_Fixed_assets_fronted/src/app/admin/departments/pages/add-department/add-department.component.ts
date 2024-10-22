import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { DepartmentService } from "src/app/admin/data/services/department.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { DepartmentsComponent } from "../departments/departments.component";

@Component({
  selector: "app-add-department",
  templateUrl: "./add-department.component.html",
  styleUrls: ["./add-department.component.sass"],
})
export class AddDepartmentComponent extends BaseComponent implements OnInit {
  action: string;
  dialogTitle: string;
  departmentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DepartmentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private snackbar: SnackbarService
  ) {
    super();
  }

  ngOnInit(): void {
    this.departmentForm = this.createDepartmentForm();
  }

  createDepartmentForm(): FormGroup {
    return this.fb.group({
      //departmentCode: ["", [Validators.required]],
      departmentName: ["", [Validators.required]],
    });
  }

  addDepartment() {
    this.departmentService
      .addDepartment(this.departmentForm.value)
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
}
