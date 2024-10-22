import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetModel } from 'src/app/clerk/_model/asset';
import { AssetCrudService } from 'src/app/clerk/_services/assetcrud.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Location } from "@angular/common";
import { AssetDetailsComponent } from '../../../asset-details.component';

@Component({
  selector: 'app-update-work',
  templateUrl: './update-work.component.html',
  styleUrls: ['./update-work.component.sass']
})
export class UpdateWorkComponent implements OnInit {

 
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
    this.dialogTitle = "View Work Order";

    console.log("The data = ", this.Data.workorder);
    
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
     contactorName: [this.Data.workorder.contactorName, Validators.required],
     typeofWork: [this.Data.workorder.typeofWork, Validators.required],
     cost: [this.Data.workorder.cost, Validators.required],
     description: [this.Data.workorder.description, Validators.required], 
    });
  }

  onSubmit() {
    //console.log("Rev = "+this.Form.value)
    this.assetCrudService
   //  this.Data.id,
      .updateWork(this.Data.id, this.Form.value)
      .pipe()
      .subscribe(
        (res) => {
          console.log(res);
          this.snackbar.showNotification('snackbar-success', "Insurance details updated successfully")
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