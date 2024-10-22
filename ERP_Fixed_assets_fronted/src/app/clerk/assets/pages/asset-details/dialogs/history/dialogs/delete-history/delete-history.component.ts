import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaintModel } from 'src/app/clerk/_model/maintenance';
import { VendorModel } from 'src/app/clerk/_model/vendor';
import { AssetCrudService } from 'src/app/clerk/_services/assetcrud.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { HistoryComponent } from '../../history/history.component';


@Component({
  selector: 'app-delete-history',
  templateUrl: './delete-history.component.html',
  styleUrls: ['./delete-history.component.sass']
})
export class DeleteHistoryComponent implements OnInit {
  maint: MaintModel;
  maintId: number;
  constructor(
    public dialogRef: MatDialogRef<HistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private assetCrudService: AssetCrudService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    //this.maint = this.data;
    this.maint = this.data.maint;
    console.log("Maint = ",this.maint);
    this.maintId = this.maint.id;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    //console.log(this.maintId);
    this.assetCrudService
      .deleteMaint(this.maintId)
      .subscribe(
        (res) => {
          this.snackbar.showNotification('snackbar-success', 'Maintainer deleted successfully!')
          //window.location.reload();
          
          this.dialogRef.close();
          console.log(res);
          
        },
        (err) => {
          console.log(err);
          this.snackbar.showNotification('snackbar-danger', 'Upload Failure!')
        }
      );
  }
}