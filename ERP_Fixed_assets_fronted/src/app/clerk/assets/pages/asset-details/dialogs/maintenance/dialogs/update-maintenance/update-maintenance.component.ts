import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AssetModel } from "src/app/clerk/_model/asset";
import { AssetCrudService } from "src/app/clerk/_services/assetcrud.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { AssetDetailsComponent } from "../../../../asset-details.component";
import { MaintenanceComponent } from "../../maintenance/maintenance.component";

@Component({
  selector: 'app-update-maintenance',
  templateUrl: './update-maintenance.component.html',
  styleUrls: ['./update-maintenance.component.sass']
})
export class UpdateMaintenanceComponent implements OnInit {
 
  dialogTitle: string;
  
  assets: AssetModel;

  Data?: any;
  message?: any;
  Form!: FormGroup;



 

  constructor(
    private assetCrudService: AssetCrudService,
    private fb: FormBuilder, private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<MaintenanceComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.Data = data.test;
    console.log("The data = ", this.Data);
  }
  formControl = new FormControl("", [
    Validators.required,
    // Validators.email,
  ]);

  ngOnInit(): void {
    this.Form = this.createForm();
    this.dialogTitle = "Update Maintainace";
    console.log("The data = ", this.Data);
  }
  onSubmit() {
    console.log("Form data =", this.Form.value)
    this.assetCrudService
      .updateMaint(this.Form.value)
      .pipe()
      .subscribe(
        (res) => {
          console.log(res);
          this.snackbar.showNotification('snackbar-success', "Maintainance Added Sucessfully")
          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
          this.snackbar.showNotification('snackbar-danger', "Maintainance upload failure!")
          this.dialogRef.close();
        }
      );
  }

  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
      ? "Not a valid email"
      : "";
  }
  createForm(): FormGroup {
    return this.fb.group({
      id: [this.Data.id, Validators.required],
      asset_id: [this.Data.asset_id, Validators.required],
      
      maintener: [this.Data.maintener, Validators.required],
      note: [this.Data.note, Validators.required],
      
    });
  }
  cancel() {
    this.dialogRef.close();
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
