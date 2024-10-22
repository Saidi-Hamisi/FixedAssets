import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetModel } from 'src/app/clerk/_model/asset';
import { AssetCrudService } from 'src/app/clerk/_services/assetcrud.service';
import { AssetDetailsComponent } from '../../asset-details.component';

import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-write-off',
  templateUrl: './write-off.component.html',
  styleUrls: ['./write-off.component.sass']
})
export class WriteOffComponent implements OnInit {
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
      scrapValue: ["", Validators.required],
      remarks: ["", Validators.required],
      
    });
  }
  onSubmit() {
    //console.log("Rev = "+this.Form.value)
    this.assetCrudService
      .writeOffAsset(this.Data.id, this.Form.value)
      .pipe()
      .subscribe(
        (res) => {
          console.log(res);
          this.snackbar.showNotification('snackbar-success', "Asset Write-Off Pending Approval")
          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
          this.snackbar.showNotification('snackbar-danger', "Asset Write-Off Failed")
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
