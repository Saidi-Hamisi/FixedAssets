import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AssetCrudService } from '../../_services/assetcrud.service';
import { ApproveComponent } from '../dialogs/approve/approve.component';
import { RejectComponent } from '../dialogs/reject/reject.component';

@Component({
  selector: 'app-pending-details',
  templateUrl: './pending-details.component.html',
  styleUrls: ['./pending-details.component.sass']
})
export class PendingDetailsComponent implements OnInit {

  assetId?: any;
  assetDetail?: any;
  loading = true;
  req?: any;

  constructor(
    private route: ActivatedRoute,
    private assetCrudService: AssetCrudService,
    private dialog: MatDialog,
  ) { 
    this.route.queryParams.subscribe((params) => {
      this.assetId = params["id"];
      console.log("ID = " + this.assetId);
    });

    
  }

  ngOnInit(): void {
    this.getPendingById();    
  }

  // Get Pending By ID starts
  getPendingById() {
    
    this.assetCrudService.getPendingReqBy(this.assetId).subscribe(
      (response) => {
        this.assetDetail = response;
        
        
        console.log("Pending details = ", this.assetDetail);
       

        if (this.assetDetail) {
          //this.finValid = true;
          this.loading = false;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onNavigate() {
    let URL =
      "https://www.google.com/maps/place/Muthaiga+Square+-+Nairobi/@-1.2780075,36.8354127,7032m/data=!3m1!1e3!4m5!3m4!1s0x182f16eb9601573b:0xd3fd21052bcc867f!8m2!3d-1.2614312!4d36.8423486";
    window.open(URL);
    //this.router.navigate([""]);
  }


  rejectReq() {
    //this.req = this.assetDetail;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px'
    dialogConfig.data = {
      req: this.assetDetail,
    };
    
    this.dialog.open(RejectComponent, dialogConfig);
  }
  approveReq() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px'
    dialogConfig.data = {
      req: this.assetDetail,
    };
    
    this.dialog.open(ApproveComponent, dialogConfig);
  }
  

}
