import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetModel } from 'src/app/clerk/_model/asset';
import { AssetCrudService } from 'src/app/clerk/_services/assetcrud.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Location } from "@angular/common";
import { AssetDetailsComponent } from '../../../asset-details.component';

@Component({
  selector: 'app-update-warranty',
  templateUrl: './update-warranty.component.html',
  styleUrls: ['./update-warranty.component.sass']
})
export class UpdateWarrantyComponent implements OnInit {

  //action: string;
  dialogTitle: string;
  //assets: AssetModel;

  Data?: any;
  message?: any;
  Form!: FormGroup;

  //categorys = [{ name: "Company" }, { name: "Individual" }];

  selectFeedback: " ";

  constructor(private location: Location, private snackbar: SnackbarService,
    private assetCrudService: AssetCrudService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AssetDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.Data = data.test;
    //console.log("The data = " + this.Data);
  }
  formControl = new FormControl("", [
    Validators.required,
  ]);

  ngOnInit(): void {
    this.Form = this.createForm();
    this.dialogTitle = "View Warranty Details";

    console.log("The data = ", this.Data.warranty);
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
      provider: [this.Data.warranty.provider, Validators.required],
      warrantNumber: [this.Data.warranty.warrantNumber, Validators.required],
      startDate: [new Date(this.Data.warranty.startDate), Validators.required],
      endDate: [new Date(this.Data.warranty.endDate), Validators.required],
      description: [this.Data.warranty.description, Validators.required],

    });
  }
  onSubmit() {
    //console.log("Rev = "+this.Form.value)
    this.assetCrudService
      //  this.Data.id,
      .updateWarranty(this.Data.id, this.Form.value)
      .pipe()
      .subscribe(
        (res) => {
          console.log(res);
          this.snackbar.showNotification('snackbar-success', "Insurance details added successfully")
          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
          this.snackbar.showNotification('snackbar-danger', "Insurance details upload failure...!!")
        }
      );
  }

  cancel() {
    this.dialogRef.close();
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}