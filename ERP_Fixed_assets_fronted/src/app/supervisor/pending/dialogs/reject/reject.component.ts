import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VendorModel } from 'src/app/clerk/_model/vendor';

import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AssetCrudService } from 'src/app/supervisor/_services/assetcrud.service';
import { PendingComponent } from '../../pending/pending.component';



@Component({
  selector: 'app-reject',
  templateUrl: './reject.component.html',
  styleUrls: ['./reject.component.sass']
})
export class RejectComponent implements OnInit {

  Form!: FormGroup;

  dialogTitle: string;
  pending: any;
  pendingId: number;
  constructor(
    public dialogRef: MatDialogRef<PendingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private assetCrudService: AssetCrudService,
    private fb: FormBuilder,
    private snackbar: SnackbarService
  ) { }

  formControl = new FormControl("", [
    Validators.required,
  ]);

  ngOnInit(): void {
    this.dialogTitle = "Are you Sure?";
    this.pending = this.data.req;
    console.log("Pending = ",this.pending);
    this.pendingId = this.pending.id
    this.Form = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      assetName: [this.pending.assetName],
      assetCode: [this.pending.assetCode],
      action: [this.pending.action],
      reason: ["", Validators.required]
      
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  submitReject(): void {
    console.log("reason = ", this.Form.value.reason);
    this.assetCrudService
      .rejectReq(this.pendingId, this.Form.value.reason)
      .subscribe(
        (res) => {
          this.snackbar.showNotification('snackbar-success', 'Action Rejected successfully!')
          //window.location.reload();
          
          this.dialogRef.close();
          console.log(res);
          
        },
        (err) => {
          console.log(err);
        }
      );
  }
  
}