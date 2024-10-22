import { formatDate } from "@angular/common";
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
import { Department } from "src/app/admin/data/types/department";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { CustodianComponent } from "../custodian/custodian.component";

@Component({
  selector: "app-add-custodian",
  templateUrl: "./add-custodian.component.html",
  styleUrls: ["./add-custodian.component.sass"],
})
export class AddCustodianComponent extends BaseComponent implements OnInit {
  action: string;
  dialogTitle: string;
  custodianForm: FormGroup;
  departments: Department[] = [];

  constructor(
    public dialogRef: MatDialogRef<CustodianComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private custodianService: CustodianService,
    private departmentService: DepartmentService,
    private snackbar: SnackbarService
  ) {
    super();

    this.custodianForm = this.createCustodianForm();
  }

  ngOnInit(): void {
    this.getDepartments();
  }

  formControl = new FormControl("", [Validators.required]);
  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
      ? "Not a valid email"
      : "";
  }

  createCustodianForm(): FormGroup {
    return this.fb.group({
      // custodianCode: ["", [Validators.required]],
      custodianName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      department: ["", [Validators.required]],
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

  addCustodian() {
    console.log(this.custodianForm.value);
    console.log(this.custodianForm.valid);
    this.custodianService
      .addCustodian(this.custodianForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log(res);
          this.snackbar.showNotification('snackbar-success', res.message)
          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
