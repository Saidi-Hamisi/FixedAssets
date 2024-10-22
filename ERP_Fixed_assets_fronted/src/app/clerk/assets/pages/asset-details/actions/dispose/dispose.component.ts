
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetModel } from 'src/app/clerk/_model/asset';
import { AssetCrudService } from 'src/app/clerk/_services/assetcrud.service';
import { AssetDetailsComponent } from '../../asset-details.component';

import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-dispose',
  templateUrl: './dispose.component.html',
  styleUrls: ['./dispose.component.sass']
})
export class DisposeComponent implements OnInit {

  action: string;
  dialogTitle: string;
  assets: AssetModel;

  Data?: any;
  message?: any;
  Form!: FormGroup;

  disposals = [
    {name: 'Donation'},
    {name: 'Selling'},
    {name: 'Write Off'},
    {name: 'Destruction'},
  ];


  constructor( private location: Location, private snackbar: SnackbarService,
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
    this.dialogTitle = "Asset Disposal";
    
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
      asset_name: [this.Data.asset_name],
      assetCode: [this.Data.assetCode],
      disposalValue: ["", Validators.required],
      disposalType: ["", Validators.required],
      remarks: ["", Validators.required],
      
    });
  }
  onSubmit() {
    console.log("Disposal = ", this.Form.value);
    this.assetCrudService
      .disposeAsset(this.Data.id, this.Form.value)
      .pipe()
      .subscribe(
        (res) => {
          console.log(res);
          this.snackbar.showNotification('snackbar-success', "Asset Disposal Pending Approval")
          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
          this.snackbar.showNotification('snackbar-danger', "Asset Disposal Failed")
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
