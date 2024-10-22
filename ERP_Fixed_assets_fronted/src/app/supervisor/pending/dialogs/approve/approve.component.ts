import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VendorModel } from 'src/app/clerk/_model/vendor';

import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AssetCrudService } from 'src/app/supervisor/_services/assetcrud.service';
import { PendingComponent } from '../../pending/pending.component';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.sass']
})
export class ApproveComponent implements OnInit {

  pending: any;
  pendingId: number;
  constructor(
    public dialogRef: MatDialogRef<PendingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private assetCrudService: AssetCrudService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.pending = this.data.req;
    console.log("Pending = ",this.pending);
    this.pendingId = this.pending.id
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  submitAproval(): void {
    //console.log(this.pendingId);
    this.assetCrudService
      .approveReq(this.pendingId)
      .subscribe(
        (res) => {
          this.snackbar.showNotification('snackbar-success', 'Request Approved successfully!')
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