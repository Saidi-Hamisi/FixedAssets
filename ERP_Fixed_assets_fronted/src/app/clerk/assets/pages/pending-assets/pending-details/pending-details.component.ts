import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { PendingAssetsComponent } from "../pending-assets.component";

@Component({
  selector: 'app-pending-details',
  templateUrl: './pending-details.component.html',
  styleUrls: ['./pending-details.component.sass']
})
export class PendingDetailsComponent implements OnInit {

  pending: any;
  pendingId: number;
  pendingRejected: boolean;

  constructor(
    public dialogRef: MatDialogRef<PendingAssetsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService
  ) {
    // super();
  }

  ngOnInit(): void {
    this.pending = this.data.data;
    console.log("Pending = ",this.pending);
    
    if(this.pending.status=="Rejected"){
      this.pendingRejected = true;
    }else{
      this.pendingRejected = false;
    }
  }




  // logoutUser() {
  //   this.userService
  //     .logoutUser({username: this.user.username})
  //     .pipe(takeUntil(this.subject))
  //     .subscribe((res) => {
  //       this.snackbar.showNotification("snackbar-success", res.message);
  //       this.dialogRef.close();
  //     }, err => {
  //       console.log(err)
  //     });
  // }
}
