import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AssetModel } from 'src/app/clerk/_model/asset';
import { AssetCrudService } from 'src/app/clerk/_services/assetcrud.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AssetDetailsComponent } from '../../asset-details.component';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.sass']
})
export class TransferComponent implements OnInit {

  //action: string;
  dialogTitle: string;
  //assets: AssetModel;
  subscription!: Subscription;

  departmentUnits: any;
  custodians: any;

  Data?: any;
  message?: any;
  Form!: FormGroup;


  selectFeedback: " ";

  constructor( private snackbar: SnackbarService,
    private assetCrudService: AssetCrudService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AssetDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.Data = data.test;
    //console.log("The data = " + this.Data);
    this.getDepartments();
    this.getCustodians();
  }
  formControl = new FormControl("", [
    Validators.required,
  ]);

  ngOnInit(): void {
    this.Form = this.createForm();
    
    this.dialogTitle = "Asset Transfer";

    //console.log("Department = "+this.Data.department)
    
  }
  getDepartments() {
    this.subscription = this.assetCrudService.getDepartments().subscribe(res => {
     this.departmentUnits = res;
     console.log("All departmentUnits =", this.departmentUnits);
    })
  }
  getCustodians() {
    this.subscription = this.assetCrudService.getCustodians().subscribe(res => {
     this.custodians = res;
    })
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
      departmentUnit: [this.Data.departmentUnit],
      custodian: [this.Data.custodian]
    });
  }
  onSubmit() {
    console.log("Trans = "+this.Form.value.departmentName)
    this.assetCrudService
      .transferAsset(this.Data.id, this.Form.value)
      .pipe()
      .subscribe(
        (res) => {
          console.log(res);
          this.snackbar.showNotification('snackbar-success', "Asset Transfer Pending Approval")
          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
          this.snackbar.showNotification('snackbar-danger', "Asset Transfer Failed...!!")
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
