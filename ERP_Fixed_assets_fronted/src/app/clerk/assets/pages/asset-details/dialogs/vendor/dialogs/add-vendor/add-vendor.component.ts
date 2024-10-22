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
import { VendorComponent } from "../../vendor/vendor.component";

@Component({
  selector: "app-add-vendor",
  templateUrl: "./add-vendor.component.html",
  styleUrls: ["./add-vendor.component.scss"],
})
export class AddVendorComponent implements OnInit {
  action: string;
  dialogTitle: string;
  employeesForm: FormGroup;
  assets: AssetModel;

  Data?: any;
  message?: any;
  Form!: FormGroup;

  categorys = [{ name: "Company" }, { name: "Individual" }];

  selectFeedback: " ";

  constructor(
    private assetCrudService: AssetCrudService,
    private fb: FormBuilder, private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<VendorComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.Data = data.test;
    console.log("The data = " + this.Data);
  }
  formControl = new FormControl("", [
    Validators.required,
    // Validators.email,
  ]);

  ngOnInit(): void {
    this.Form = this.createForm();
    this.dialogTitle = "Add Vendor";
    // this.Form = this.fb.group({
    //   address: ['', Validators.required],
    //   taxid: ['', Validators.required],
    //   phone: ['', Validators.required],
    //   location: ['', Validators.required],
    //   email: ['', Validators.required],
    //   note: ['', Validators.required],
    //   website: ['', Validators.required],
    //   category: ['', Validators.required],
    // })
  }
  onSubmit() {
    this.assetCrudService
      .addVendor(this.Data, this.Form.value)
      .pipe()
      .subscribe(
        (res) => {
          console.log(res);
          this.snackbar.showNotification('snackbar-success', "Vendor Added Sucessfully")
          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
          this.snackbar.showNotification('snackbar-danger', "Vendor upload failure!")
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
      address: ["", Validators.required],
      
      vendorName: ["", Validators.required],
      taxid: ["", Validators.required],
      phone: ["", Validators.required],
      location: ["", Validators.required],
      email: ["", Validators.required],
      note: ["", Validators.required],
      website: ["", Validators.required],
      category: ["", Validators.required],
    });
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
