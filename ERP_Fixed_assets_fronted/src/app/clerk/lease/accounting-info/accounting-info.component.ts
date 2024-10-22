import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AssetModel } from "../../_model/asset";
import { Subject, Subscription, takeUntil } from "rxjs";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { LeasesLookupComponent } from "../lookups/leases-lookup/leases-lookup.component";
import { LeaseService } from "../../_services/leases.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-accounting-info",
  templateUrl: "./accounting-info.component.html",
  styleUrls: ["./accounting-info.component.scss"],
})
export class AccountingInfoComponent implements OnInit {
  randomAccountData = [
    {
      period: 1,
      date: "2023-01-01",
      openingBalance: 100000,
      leasePayment: 20000,
      discount: 5000,
      closingBalLease: 80000,
      bal: 50000,
      depreciation: 10000,
      closingBalRight: 40000,
    },
    {
      period: 2,
      date: "2023-02-01",
      openingBalance: 80000,
      leasePayment: 20000,
      discount: 4000,
      closingBalLease: 60000,
      bal: 45000,
      depreciation: 9000,
      closingBalRight: 36000,
    },
    {
      period: 3,
      date: "2023-03-01",
      openingBalance: 60000,
      leasePayment: 20000,
      discount: 3000,
      closingBalLease: 40000,
      bal: 40000,
      depreciation: 8000,
      closingBalRight: 32000,
    },
    // Add more objects as needed
  ];

  // ********************************************
  displayedColumnsROU: string[] = [
    "id",
    "date",
    "balance",
    "depreciation",
    "closingBal",
  ];
  dataSourceROU!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginatorROU!: MatPaginator;
  @ViewChild(MatSort) sortROU!: MatSort;

  // ********************************************
  displayedColumnsLease: string[] = [
    // "id",
    "period",
    // "escalationFactor",
    "date",
    "openingBal",
    "leasePayment",
    "discount",

    "closingBal",

  ];
  dataSourceLease!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginatorLease!: MatPaginator;
  @ViewChild(MatSort) sortLease!: MatSort;

  subscription!: Subscription;

  accForm: FormGroup;

  isLoading = true;

  destroy$: Subject<boolean> = new Subject<boolean>();

  leaseId?: any;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private leaseService: LeaseService,
    private snackbar: SnackbarService,
    private route: ActivatedRoute
  ) { }

  // ngOnInit(): void {
  //   this.getLeasses();

  //   this.accForm = this.fb.group({
  //     leaseId: ["", [Validators.required]],
  //     property: ["", [Validators.required]],
  //     startDate: ["", [Validators.required]],
  //     endDate: ["", [Validators.required]],
  //   });


  //   this.route.queryParams.subscribe((params) => {
  //     this.leaseId = params["id"];
  //     console.log("ID = ", this.leaseId);
  //   });

  //   this.getData(this.leaseId)

  // }
  ngOnInit(): void {
    this.getLeasses();

    this.accForm = this.fb.group({
      leaseId: ["", [Validators.required]],
      property: ["", [Validators.required]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
    });

    this.route.queryParams.subscribe((params) => {
      if (params.hasOwnProperty("id")) {

        this.leaseId = params['id'];
        const serializedData = params['additionalData'];
        const additionalData = JSON.parse(serializedData);

        console.log('ID:', this.leaseId);
        console.log('Additional Data:', additionalData);

        // this.leaseId = params["id"];
        // const additionalData = params['additionalData'];

        // console.log("additionalData =", additionalData);

        this.accForm.patchValue({
          leaseId: additionalData.id,
          property: additionalData.leaseType,
          startDate: additionalData.startDate,
          endDate: additionalData.endDate,
        });

        console.log("ID =", this.leaseId);
        this.getData(this.leaseId);
      }
    });
  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  dataROU: any[] = [];
  dataLease: any[] = [];

  getData(id) {
    this.leaseService
      .getROUArmotizationById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.statusCode == 302) {
            this.dataROU = res.entity;
            console.log("this.dataROU: ", this.dataROU)
            // Binding with the datasource
            this.dataSourceROU = new MatTableDataSource(this.dataROU);
            this.dataSourceROU.paginator = this.paginatorROU;
            this.dataSourceROU.sort = this.sortROU;
            this.isLoading = false;
          } else {
            this.snackbar.showNotification("snackbar-danger", res.message);
          }
        },
        error: (err) => {
          this.snackbar.showNotification("snackbar-danger", "Server Error: !!");
        },
        complete: () => { },
      }),
      Subscription;

    this.leaseService
      .getLeaseArmotizationById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.statusCode == 302) {
            this.dataLease = res.entity;
            console.log("this.dataLease: ", this.dataLease)
            // Binding with the datasource
            this.dataSourceLease = new MatTableDataSource(
              this.dataLease
            );
            this.dataSourceLease.paginator = this.paginatorLease;
            this.dataSourceLease.sort = this.sortLease;

            this.isLoading = false;
            this.isLoading = false;
          } else {
            this.snackbar.showNotification("snackbar-danger", res.message);
          }
        },
        error: (err) => {
          this.snackbar.showNotification("snackbar-danger", "Server Error: !!");
        },
        complete: () => { },
      }),
      Subscription;

    // this.subscription = this.assetsAPI.getAssetsList().subscribe(res => {
    //  this.data = res;
    //  //console.log("All Assets ="+JSON.stringify(res));

    //  if(this.data){
    //   this.isLoading = false;
    //  }

    // })
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

        this.accForm.patchValue({
          leaseId: result.data[0].id,
          property: result.data[0].leaseType,
          startDate: result.data[0].startDate,
          endDate: result.data[0].endDate,
        });

        this.getData(result.data[0].id);
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
}
