import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetModel } from 'src/app/clerk/_model/asset';
import { AssetCrudService } from 'src/app/clerk/_services/assetcrud.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Location } from "@angular/common";
import { AssetDetailsComponent } from '../../asset-details.component';



@Component({
  selector: 'app-revaluate',
  templateUrl: './revaluate.component.html',
  styleUrls: ['./revaluate.component.sass']
})
export class RevaluateComponent implements OnInit {
  //action: string;
  dialogTitle: string;
  //assets: AssetModel;

  Data?: any;
  message?: any;
  Form!: FormGroup;

  //categorys = [{ name: "Company" }, { name: "Individual" }];

  selectFeedback: " ";

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
    this.dialogTitle = "Asset Revaluation";
    
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
      newValue: ["", Validators.required],
      remarks: ["", Validators.required],
      
    });
  }
  onSubmit() {
    //console.log("Rev = "+this.Form.value)
    this.assetCrudService
      .revaluateAsset(this.Data.id, this.Form.value)
      .pipe()
      .subscribe(
        (res) => {
          console.log(res);
          this.snackbar.showNotification('snackbar-success', "Asset Revaluation Pending Approval")
          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
          this.snackbar.showNotification('snackbar-danger', "Revaluation Failed")
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
