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
  selector: "app-add-department-unit",
  templateUrl: "./add-department-unit.component.html",
  styleUrls: ["./add-department-unit.component.sass"],
})
export class AddDepartmentUnitComponent
  extends BaseComponent
  implements OnInit
{
  departmentUnitForm: FormGroup;
  departments: Department[] = [];
  
  constructor(
    public dialogRef: MatDialogRef<DepartmentUnitsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private departmentUnitService: DepartmentUnitsService,
    private departmentservice: DepartmentService,
    private snackbar: SnackbarService
  ) {
    super();

    this.departmentUnitForm = this.createCustodianForm()
  }

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments() {
    this.departmentservice
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

  createCustodianForm(): FormGroup {
    return this.fb.group({
      //departmentCode: ["", [Validators.required]],
      departmentName: ["", [Validators.required]],
      department_fk: ["", [Validators.required]],
    });
  }

  addDepartmentUnit(){
    this.departmentUnitService.addDepartmentUnit(this.departmentUnitForm.value).pipe(takeUntil(this.subject)).subscribe(res => {
      this.snackbar.showNotification("snackbar-success", res.message)
      this.dialogRef.close();
      console.log(res)
    }, err => {
      console.log(err)
    })
  }

  onClick(){
    this.dialogRef.close();
  }
}
