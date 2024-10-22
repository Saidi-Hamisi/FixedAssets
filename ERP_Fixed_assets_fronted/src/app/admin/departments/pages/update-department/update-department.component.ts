import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { DepartmentService } from "src/app/admin/data/services/department.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { DepartmentsComponent } from "../departments/departments.component";

@Component({
  selector: "app-update-department",
  templateUrl: "./update-department.component.html",
  styleUrls: ["./update-department.component.sass"],
})
export class UpdateDepartmentComponent extends BaseComponent implements OnInit {
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
    this.departmentForm = this.updateDepartmentForm();
  }

  updateDepartmentForm(): FormGroup {
    console.log(this.data.custodian);
    return this.fb.group({
      id: [this.data.department.id, [Validators.required]],
      departmentCode: [
        this.data.department.departmentCode,
        [Validators.required],
      ],
      departmentName: [
        this.data.department.departmentName,
        [Validators.required],
      ],
    });
  }

  updateDepartment() {
    this.departmentService
      .updateDepartment(this.departmentForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification("snackbar-success", res.message);
          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onClick() {
    this.dialogRef.close();
  }
}
