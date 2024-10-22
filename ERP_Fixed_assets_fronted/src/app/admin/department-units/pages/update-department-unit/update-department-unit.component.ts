import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { DepartmentUnitsService } from "src/app/admin/data/services/department-units.service";
import { DepartmentService } from "src/app/admin/data/services/department.service";
import { Department } from "src/app/admin/data/types/department";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { DepartmentUnitsComponent } from "../department-units/department-units.component";

@Component({
  selector: "app-update-department-unit",
  templateUrl: "./update-department-unit.component.html",
  styleUrls: ["./update-department-unit.component.sass"],
})
export class UpdateDepartmentUnitComponent
  extends BaseComponent
  implements OnInit
{
  departmentUnitForm: FormGroup;
  departments: Department[] = [];

  constructor(
    public dialogRef: MatDialogRef<DepartmentUnitsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private departmentUnitService: DepartmentUnitsService,
    private snackbar: SnackbarService
  ) {
    super();
    this.departmentUnitForm = this.createDepartmentUnitForm();
  }

  ngOnInit(): void {
    this.getDepartments();
    console.log(this.data);
  }

  createDepartmentUnitForm(): FormGroup {
    return this.fb.group({
      id: [this.data.departmentUnit.id, [Validators.required]],
      departmentCode: [
        this.data.departmentUnit.departmentCode,
        [Validators.required],
      ],
      departmentName: [
        this.data.departmentUnit.departmentName,
        [Validators.required],
      ],
      department: [this.data.departmentUnit.department, [Validators.required]],
    });
  }

  getDepartments() {
    this.departmentService
      .getDepartments()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.departments = res;
          console.log(this.departments);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  updateDepartmentUnit() {
    this.departmentUnitService
      .updateDepartmentUnit(this.departmentUnitForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification("snackbar-success", res.message);
          this.dialogRef.close()
          console.log(res);
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
