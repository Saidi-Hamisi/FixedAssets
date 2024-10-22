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

@Component({
  selector: 'app-update-vendor',
  templateUrl: './update-vendor.component.html',
  styleUrls: ['./update-vendor.component.sass']
})
export class UpdateVendorComponent implements OnInit {
  action: string;
  dialogTitle: string;
  employeesForm: FormGroup;
  assets: AssetModel;

  Data?: any;
  message?: any;
  Form!: FormGroup;

  categorys = [{ name: "Company" }, { name: "Individual" }];


  constructor(
    private assetCrudService: AssetCrudService,
    private fb: FormBuilder, private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<AssetDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.Data = data.test;
    console.log("The data = " + this.Data);
  }
  formControl = new FormControl("", [
    Validators.required,
  ]);

  ngOnInit(): void {
    this.Form = this.createForm();
    this.dialogTitle = "Update Vendor";
    console.log("The data = ", this.Data);
  }

  onSubmit() {
    this.assetCrudService
      .updateVendor(this.Form.value)
      .pipe()
      .subscribe(
        (res) => {
          console.log(res);
          this.snackbar.showNotification('snackbar-success', "Vendor updated Sucessfully")
          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
          this.snackbar.showNotification('snackbar-danger', "Vendor update failure!")
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
      address: [this.Data.address, Validators.required],
      
      vendorName: [this.Data.vendorName, Validators.required],
      taxid: [this.Data.taxid, Validators.required],
      phone: [this.Data.phone, Validators.required],
      location: [this.Data.location, Validators.required],
      email: [this.Data.email, Validators.required],
      note: [this.Data.note, Validators.required],
      website: [this.Data.website, Validators.required],
      category: [this.Data.category, Validators.required],
    });
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
