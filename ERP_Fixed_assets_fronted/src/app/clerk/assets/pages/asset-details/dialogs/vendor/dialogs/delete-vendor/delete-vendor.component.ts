import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VendorModel } from 'src/app/clerk/_model/vendor';
import { AssetCrudService } from 'src/app/clerk/_services/assetcrud.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { VendorComponent } from '../../vendor/vendor.component';

@Component({
  selector: 'app-delete-vendor',
  templateUrl: './delete-vendor.component.html',
  styleUrls: ['./delete-vendor.component.sass']
})
export class DeleteVendorComponent implements OnInit {

  vendor: VendorModel;
  vendorId: number;
  constructor(
    public dialogRef: MatDialogRef<VendorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private assetCrudService: AssetCrudService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.vendor = this.data.vendor;
    console.log("Vendor = ",this.vendor);
    this.vendorId = this.vendor.id
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    console.log(this.vendorId);
    this.assetCrudService
      .deleteVendor(this.vendorId)
      .subscribe(
        (res) => {
          this.snackbar.showNotification('snackbar-success', 'Vendor deleted successfully!')
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