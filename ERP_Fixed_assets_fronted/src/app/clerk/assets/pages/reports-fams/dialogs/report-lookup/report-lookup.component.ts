import { DatePipe } from "@angular/common";
import { HttpParams, HttpResponse } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
} from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { ReportFamService } from "src/app/clerk/_services/reports_fams.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { ReportsFamsComponent } from "../../reports-fams.component";
import { AssetsLookupComponent } from "src/app/clerk/lease/lookups/assets-lookup/assets-lookup.component";
import { AssetCrudService } from "src/app/clerk/_services/assetcrud.service";
import { LeasesLookupComponent } from "src/app/clerk/lease/lookups/leases-lookup/leases-lookup.component";
import { LeaseService } from "src/app/clerk/_services/leases.service";

@Component({
  selector: "app-report-lookup",
  templateUrl: "./report-lookup.component.html",
  styleUrls: ["./report-lookup.component.sass"],
})
export class ReportLookupComponent implements OnInit {
  action: string;
  dialogTitle: string;

  generalForm: FormGroup;
  general: boolean = false;

  supplierPaymentForm: FormGroup;
  supplierPayment: boolean = false;

  customerStatementForm: FormGroup;
  customerStatement: boolean = false;

  bankForm: FormGroup;
  bank: boolean = false;

  paymentRecievedForm: FormGroup;
  paymentRecieved: boolean = false;

  invoicesPerCustomerForm: FormGroup;
  invoicesPerCustomer: boolean = false;

  category: any;
  customers: any;
  params: any;
  title: any;
  subscription!: Subscription;
  error: any;
  loading: boolean;
  singleReport: boolean = false;
  supplierss: any;

  activateStatus: boolean = false;

  balanceSheetForm: FormGroup;
  generalLeaseForm: FormGroup;

  balanceSheet = false;
  generalLease = false;

  leaseTypes: any[] = [
    { id: "0", name: "All" },
    { id: "1", name: "Land" },
    { id: "2", name: "Building" },
    { id: "3", name: "Plant and machinery" },
    { id: "4", name: "Motor vehicle" },
    { id: "5", name: "Software" },
    { id: "6", name: "Other" },
  ];

  constructor(
    public dialogRef: MatDialogRef<ReportsFamsComponent>,
    private datepipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private reportFamService: ReportFamService,
    private snackbar: SnackbarService,
    public dialog: MatDialog,
    private assetsAPI: AssetCrudService,
    private leaseService: LeaseService
  ) { }

  ngOnInit(): void {
    this.getAssetList();

    if (this.data.test == "depreciation") {
      this.title = this.data.test;
      this.general = true;
      this.generalForm = this.createGeneralForm();
    } else if (this.data.test == "maintenance") {
      this.title = this.data.test;
      this.general = true;
      this.generalForm = this.createGeneralForm();
    } else if (this.data.test == "insurance") {
      this.title = this.data.test;
      this.general = true;
      this.generalForm = this.createGeneralForm();
    } else if (this.data.test == "balancesheet") {
      this.getLeasses();
      this.title = this.data.test;
      this.balanceSheet = true;
      this.balanceSheetForm = this.createBalanceSheetForm();
    } else if (this.data.test == "warranty") {
      this.title = this.data.test;
      this.general = true;
      this.generalForm = this.createGeneralForm();
    }
    else if (this.data.test == "profitandloss") {
      this.getLeasses();
      this.title = this.data.test;
      this.balanceSheet = true;
      this.balanceSheetForm = this.createBalanceSheetForm();
    }


    else if (this.data.test == "general leases") {
      this.title = this.data.test;
      this.generalLease = true;
      this.generalLeaseForm = this.createGeneralLeasesForm();
    }


  }

  createGeneralForm(): FormGroup {
    return this.fb.group({
      assetName: ["", Validators.required],
      assetId: [""],
    });
  }

  createBalanceSheetForm(): FormGroup {
    return this.fb.group({
      leaseType: ["", Validators.required],
      leaseId: ["", Validators.required],
      periodId: ["", Validators.required],
      leaseTerm: ["", Validators.required],

    });
  }

  createGeneralLeasesForm(): FormGroup {
    return this.fb.group({
      leaseType: ["", Validators.required],
    });
  }

  assetIsSelected = false;
  selectedAssets: any[] = [];
  assetsLookup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      action: "view assets",
      data: this.assetData,
      selected: this.selectedAssets,
    };

    const dialogRef = this.dialog.open(AssetsLookupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.data.length != 0) {
        console.log("result: ", result.data[0]);

        this.generalForm.patchValue({
          assetName: result.data[0].asset_name,
          assetId: result.data[0].id,
        });

        this.assetIsSelected = true;
      }
    });
  }

  assetData: any;
  getAssetList() {
    this.subscription = this.assetsAPI.getAssetsList().subscribe((res) => {
      this.assetData = res;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  generateReport() {
    if (this.data.test == "depreciation") {
      this.generateDepreciationReport();
    } else if (this.data.test == "maintenance") {
      this.generateMaintenanceReport();
    } else if (this.data.test == "insurance") {
      this.generateInsuranceReport();
    }
    else if (this.data.test == "warranty") {
      this.generateWarrantyReport();
    }
    else if (this.data.test == "profitandloss") {
      this.generateProfitAndLossReport();
    }
    else if (this.data.test == "balancesheet") {
      this.generateBalanceSheetReport();
    }

    else if (this.data.test == "general leases") {
      this.generateAllLeaseReport();
    }



  }

  generateDepreciationReport() {
    this.loading = true;
    const params = new HttpParams().set(
      "assetId",
      this.generalForm.value.assetId
    );

    console.log("params: ", params);
    this.reportFamService.generateDepreciationReport(params).subscribe(
      (res) => {
        const blob = new Blob([res], {
          type: "application/octet-stream",
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "depreciation-report.xlsx";
        link.click();
        this.loading = false;
      },
      (error) => {
        this.snackbar.showNotification(
          "snackbar-danger",
          "Error generating depreciation report: " + error
        );
        console.error("Error generating depreciation report:", error);
        this.loading = false;
        // Handle error appropriately, e.g., show error message to the user
      }
    );
    this.onNoClick();
  }

  generateMaintenanceReport() {
    this.loading = true;
    const params = new HttpParams().set(
      "assetId",
      this.generalForm.value.assetId
    );

    console.log("params: ", params);
    this.reportFamService.generateMaintenanceReport(params).subscribe(
      (res) => {
        const blob = new Blob([res], {
          type: "application/octet-stream",
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "maintenance-report.xlsx";
        link.click();
        this.loading = false;
      },
      (error) => {
        this.snackbar.showNotification(
          "snackbar-danger",
          "Error generating maintenance report: " + error
        );
        console.error("Error generating maintenance report:", error);
        this.loading = false;
        // Handle error appropriately, e.g., show error message to the user
      }
    );
    this.onNoClick();
  }

  generateInsuranceReport() {
    this.loading = true;
    const params = new HttpParams().set(
      "assetId",
      this.generalForm.value.assetId
    );

    console.log("params: ", params);
    this.reportFamService.generateInsuranceReport(params).subscribe(
      (res) => {
        const blob = new Blob([res], {
          type: "application/octet-stream",
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "insurance-report.xlsx";
        link.click();
        this.loading = false;
      },
      (error) => {
        this.snackbar.showNotification(
          "snackbar-danger",
          "Error generating insurance report: " + error
        );
        console.error("Error generating insurance report:", error);
        this.loading = false;
        // Handle error appropriately, e.g., show error message to the user
      }
    );
    this.onNoClick();
  }


  generateWarrantyReport() {
    this.loading = true;
    const params = new HttpParams().set(
      "assetId",
      this.generalForm.value.assetId
    );

    console.log("params: ", params);
    this.reportFamService.generateWarrantyReport(params).subscribe(
      (res) => {
        const blob = new Blob([res], {
          type: "application/octet-stream",
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "warranty-report.xlsx";
        link.click();
        this.loading = false;
      },
      (error) => {
        this.snackbar.showNotification(
          "snackbar-danger",
          "Error generating warranty report: " + error
        );
        console.error("Error generating warranty report:", error);
        this.loading = false;
        // Handle error appropriately, e.g., show error message to the user
      }
    );
    this.onNoClick();
  }



  lessorIsSelected = false;
  selectedLeases: any[] = [];
  leases: any;
  leasesLookup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      action: "view lessors",
      data: this.leases,
      selected: this.selectedLeases,
    };

    const dialogRef = this.dialog.open(LeasesLookupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.data.length != 0) {
        console.log("result: ", result.data[0]);

        this.balanceSheetForm.patchValue({
          leaseId: result.data[0].id,
          leaseType: result.data[0].leaseType,
          leaseTerm: result.data[0].leaseTerm,

        });

        // this.getData(result.data[0].id);
        //this.getSupplierById(result.data[0].id);
        this.lessorIsSelected = true;
      }
    });
  }

  getLeasses() {
    this.leaseService.getLeasses().subscribe(
      (response: any) => {
        //this.detail = response;

        console.log("Leases = ", response);

        this.leases = response.entity;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  generateBalanceSheetReport(): void {


    this.reportFamService.generateBalanceSheet(this.balanceSheetForm.value.leaseId, this.balanceSheetForm.value.periodId).subscribe(
      (data: ArrayBuffer) => {
        this.downloadFile(data, "balancesheet.pdf");
      },
      (error) => {
        console.error("Failed to fetch balance sheet:", error);
      }
    );
  }
  generateProfitAndLossReport() {
    this.reportFamService.getProfitAndLoss(this.balanceSheetForm.value.leaseId, this.balanceSheetForm.value.periodId).subscribe(
      (data: ArrayBuffer) => {
        this.downloadFile(data, 'profit_and_loss.pdf');
      },
      (error) => {
        console.error('Failed to generate profit and loss report:', error);
      }
    );
  }

  generateAllLeaseReport() {
    let param: string;
  
    if (this.generalLeaseForm.value.leaseType === 'All') {
      param = '';
    } else {
      param = this.generalLeaseForm.value.leaseType;
    }

    console.log("param: ", param);
  
    this.reportFamService.getAllLeaseReport(param).subscribe(
      (data: ArrayBuffer) => {
        this.downloadFile(data, 'leases.pdf');
      },
      (error) => {
        console.error('Failed to generate all lease report:', error);
      }
    );
  }
  


  private downloadFile(data: ArrayBuffer, fileName: string): void {
    const blob = new Blob([data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
