import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetCrudService } from 'src/app/clerk/_services/assetcrud.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AssetDetailsComponent } from '../../asset-details.component';


@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.sass']
})
export class QrCodeComponent implements OnInit {

  //maint: MaintModel;
  qrInfo: any;
  maintId: number;
  Data: any;

  imageToShow: any;
  isImageLoading: boolean;

  constructor(
    public dialogRef: MatDialogRef<AssetDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private assetCrudService: AssetCrudService,
    private snackbar: SnackbarService
  ) { 
    this.Data = data.test;
    //console.log("The data = ", this.Data); 
    this.getImageFromService();    
  }

  ngOnInit(): void {
   
       
  }

getImageFromService() {
  this.isImageLoading = true;
  this.assetCrudService.getImageQR(this.Data.id).subscribe(response => {
    this.createImageFromBlob(response);
    this.isImageLoading = false;
  }, error => {
    this.isImageLoading = false;
    console.log(error);
  });
}
createImageFromBlob(image: Blob) {
  let reader = new FileReader();
  reader.addEventListener("load", () => {
     this.imageToShow = reader.result;
  }, false);

  if (image) {
     reader.readAsDataURL(image);
  }
}
 

  onNoClick(): void {
    this.dialogRef.close();
  }

}