import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { CustodianService } from "src/app/admin/data/services/custodian.service";
import { DepartmentService } from "src/app/admin/data/services/department.service";
import { Custodian } from "src/app/admin/data/types/custodian";
import { Department } from "src/app/admin/data/types/department";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { CustodianComponent } from "../custodian/custodian.component";

@Component({
  selector: "app-update-custodian",
  templateUrl: "./update-custodian.component.html",
  styleUrls: ["./update-custodian.component.sass"],
})
export class UpdateCustodianComponent extends BaseComponent implements OnInit {
  action: string;
  dialogTitle: string;
  custodianForm: FormGroup;
  departments: Department[] = [];
  custodianData: Custodian;

  constructor(
    public dialogRef: MatDialogRef<CustodianComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private custodianService: CustodianService,
    private departmentService: DepartmentService,
    private snackbar: SnackbarService
  ) {
    super();

    this.custodianForm = this.updateCustodianForm();
  }

  ngOnInit(): void {
    this.getDepartments();
    this.custodianData = this.data.custodian;
  }

  formControl = new FormControl("", [Validators.required]);
  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
      ? "Not a valid email"
      : "";
  }

  updateCustodianForm(): FormGroup {
    //console.log(this.data.custodian);
    return this.fb.group({
      id: [this.data.custodian.id, [Validators.required]],
      custodianCode: [this.data.custodian.custodianCode, [Validators.required]],
      custodianName: [this.data.custodian.custodianName, [Validators.required]],
      email: [this.data.custodian.email, [Validators.required]],
      department: [this.data.custodian.department, [Validators.required]],
    });
  }

  getDepartments() {
    this.departmentService
      .getDepartments()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.departments = res;
          //console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  updateCustodian() {
    console.log(this.custodianForm.value);
    this.custodianService
      .editCustodian(this.custodianForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.dialogRef.close();
          this.snackbar.showNotification('snackbar-success', res.message)
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
