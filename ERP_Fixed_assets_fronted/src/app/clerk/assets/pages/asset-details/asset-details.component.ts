import { Component, Inject, Input, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { AssetCrudService } from "src/app/clerk/_services/assetcrud.service";
import { AssetModel } from "src/app/clerk/_model/asset";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AddVendorComponent } from "./dialogs/vendor/dialogs/add-vendor/add-vendor.component";
import { ViewWorkComponent } from "./dialogs/work/view-work/view-work.component";
import { ViewWarrantyComponent } from "./dialogs/warranty/view-warranty/view-warranty.component";
import { ViewInsuranceComponent } from "./dialogs/insurance/view-insurance/view-insurance.component";
import { UpdateInsuranceComponent } from "./dialogs/insurance/update-insurance/update-insurance.component";
import { UpdateWorkComponent } from "./dialogs/work/update-work/update-work.component";
import { AddInsuranceComponent } from "./dialogs/insurance/add-insurance/add-insurance.component";
import { AddWorkComponent } from "./dialogs/work/add-work/add-work.component";
import { AddWarrantyComponent } from "./dialogs/warranty/add-warranty/add-warranty.component";
import { UpdateWarrantyComponent } from "./dialogs/warranty/update-warranty/update-warranty.component";
import { RevaluateComponent } from "./actions/revaluate/revaluate.component";
import { TransferComponent } from "./actions/transfer/transfer.component";
import { DisposeComponent } from "./actions/dispose/dispose.component";
import { WriteOffComponent } from "./actions/write-off/write-off.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { QrCodeComponent } from "./dialogs/qr-code/qr-code.component";
import { BarCodeComponent } from "./dialogs/bar-code/bar-code.component";

@Component({
  selector: "app-asset-details",
  templateUrl: "./asset-details.component.html",
  styleUrls: ["./asset-details.component.scss"],
})
export class AssetDetailsComponent implements OnInit {
  
  assetId?: any;
  assetDetail?: any;
  stringfiedData: any;
  detail: any;
  dataToQr: any;
  assets: AssetModel | null;

  finValid?: any;

  qrInfo: any;

  selectFeedback: "";

  Form!: FormGroup;
  selectForm!: FormGroup;

  floatLabelControl = new FormControl("auto");
  options = [{ name: "View" }, { name: "Add" }];

  loading = true;
  loaded = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private assetCrudService: AssetCrudService,
    private dialog: MatDialog,
    private snackbar: SnackbarService
  ) {}

  //   async ngOnInit() {
  //     try {
  //         await this.getData(); // DataCall
  //     } catch (err) {
  //         console.log('Error', err);
  //     }
  //     this.loaded = true;
  //     this.loading = false;
  // }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.assetId = params["id"];
      console.log("ID = " + this.assetId);
    });

    this.getAssetById();
    //this.getQRCode();

    this.selectForm = this.createForm();

    this.Form = this.fb.group({
      vendor: [""],
      maintenance: [""],
      workOrder: [""],
      warranty: [""],
      insurance: [""],
    });
  }


  createForm(): FormGroup {
    return this.fb.group({
      warranty: [""],    
      work: [""],
      insurance: [""],     
    });
  }

  // onNavigate() {
  //   let URL =
  //     "https://www.google.com/maps/place/Muthaiga+Square+-+Nairobi/@-1.2780075,36.8354127,7032m/data=!3m1!1e3!4m5!3m4!1s0x182f16eb9601573b:0xd3fd21052bcc867f!8m2!3d-1.2614312!4d36.8423486";
  //   window.open(URL);
  //   //this.router.navigate([""]);
  // }

  onNavigate(area) {
    let encodedArea = encodeURIComponent(area);
    let URL = `https://www.google.com/maps/place/${encodedArea}`;
    window.open(URL);
    // this.router.navigate([""]);
  }
  

  

  // Get By ID starts
  getAssetById() {
    
    this.assetCrudService.getAsset(this.assetId).subscribe(
      (response) => {
        this.assetDetail = response;
        this.stringfiedData = JSON.stringify(this.assetDetail);

        console.log("details = ", this.assetDetail);
       

        if (this.assetDetail) {
          this.finValid = true;
          this.loading = false;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  
  // Select Options start
  selectVendor() {
    let route = "/clerk/assets/vendor";
    this.router.navigate([route], { queryParams: { id: this.assetDetail.id } });
  }
  selectMaint() {
    let route = "/clerk/assets/maintenance";
    this.router.navigate([route], { queryParams: { id: this.assetDetail.id } });
  }
  selectHistory() {
    let route = "/clerk/assets/history";
    this.router.navigate([route], { queryParams: { id: this.assetDetail.id } });
  }
  onEditAsset() {
    let route = "/clerk/assets/edit-asset";
    this.router.navigate([route], { queryParams: { id: this.assetDetail.id } });
  }
  selectDepreciation(){
    let route = "/clerk/assets/calc-depreciation";
    this.router.navigate([route], { queryParams: { id: this.assetDetail.id } });
  }

  selectInsurance(event: any) {
    // if (event.value == "View") {
    //   this.viewInsurance();
    // }
    if (event.value == "View") {
      this.updateInsurance();
    }
    if (event.value == "Add") {
      this.addInsurance();
    }

    setTimeout(()=> this.selectForm.reset(), 3000);
  }

  selectWarranty(event: any) {
 
    if (event.value == "View") {
      this.updateWarranty();
    }
    if (event.value == "Add") {
      this.addWarranty();
    }

    setTimeout(()=> this.selectForm.reset(), 3000);
  }

  selectWork(event: any) {  
    if (event.value == "View") {
      this.updateWork();
    }
    else {
      this.addWork();
    }

    setTimeout(()=> this.selectForm.reset(), 3000);
  }

  // Dialog Boxes Start
  openRevaluate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      test: this.assetDetail,
    };

    this.dialog.open(RevaluateComponent, dialogConfig);
  }
  openTransfer() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      test: this.assetDetail,
    };
    //dialogConfig.data = this.asset.sn
    // dialogConfig.width = "30%"
    this.dialog.open(TransferComponent, dialogConfig);
  }
  openDispose() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      test: this.assetDetail,
    };

    this.dialog.open(DisposeComponent, dialogConfig);
  }
  openWriteOff() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      test: this.assetDetail,
    };

    this.dialog.open(WriteOffComponent, dialogConfig);
  }

  //Insurance
  addInsurance() {
    if (this.assetDetail.warranty) {
      this.snackbar.showNotification(
        "orange",
        "Insurance already exists for this asset!"
      );
    } else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "500px";
      dialogConfig.data = {
        test: this.assetDetail,
      };

      this.dialog.open(AddInsuranceComponent, dialogConfig);
    }
  }
  updateInsurance() {
    if (this.assetDetail.warranty) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "500px";
      dialogConfig.data = {
        test: this.assetDetail,
      };

      this.dialog.open(UpdateInsuranceComponent, dialogConfig);
    } else {
      this.snackbar.showNotification(
        "orange",
        "No Insurance exists for this asset!"
      );
    }
  }
  viewInsurance() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      test: this.assetDetail,
    };

    this.dialog.open(ViewInsuranceComponent, dialogConfig);
  }

  //Warranty
  addWarranty() {
    if (this.assetDetail.warranty) {
      this.snackbar.showNotification(
        "orange",
        "Warranty already exists for this asset!"
      );
    } else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "500px";
      dialogConfig.data = {
        test: this.assetDetail,
      };

      this.dialog.open(AddWarrantyComponent, dialogConfig);
    }
  }

  updateWarranty() {
    //console.log("log says", this.assetDetail.warranty)

    if (this.assetDetail.warranty) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "500px";
      dialogConfig.data = {
        test: this.assetDetail,
      };

      this.dialog.open(UpdateWarrantyComponent, dialogConfig);
    } else {
      this.snackbar.showNotification(
        "orange",
        "No warranty exists for this asset!"
      );
    }
  }

  //Work
  addWork() {
    if (this.assetDetail.workorder) {
      this.snackbar.showNotification(
        "orange",
        "Work Order already exists for this asset!"
      );
    } else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "500px";
      dialogConfig.data = {
        test: this.assetDetail,
      };

      this.dialog.open(AddWorkComponent, dialogConfig);
    }
  }

  updateWork() {
    if (this.assetDetail.workorder) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "500px";
      dialogConfig.data = {
        test: this.assetDetail,
      };

      this.dialog.open(UpdateWorkComponent, dialogConfig);
    } else {
      this.snackbar.showNotification(
        "orange",
        "No Work Order exists for this asset!"
      );
    }
  }

  viewWork() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      test: this.assetDetail,
    };

    this.dialog.open(ViewWorkComponent, dialogConfig);
  }

  // Q-R Code
  openQRCode() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    //dialogConfig.width = "300px";
    dialogConfig.data = {
      test: this.assetDetail,
    };

    this.dialog.open(QrCodeComponent, dialogConfig);
  }
  openBarCode() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    //dialogConfig.width = "300px";
    dialogConfig.data = {
      test: this.assetDetail,
    };

    this.dialog.open(BarCodeComponent, dialogConfig);
  }

}
