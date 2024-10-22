import { Component, Inject, Input, OnInit, ViewChild } from "@angular/core";
import { Location } from "@angular/common";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
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
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { DepreciationModel } from "src/app/clerk/_model/depreciation";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatMenuTrigger } from "@angular/material/menu";
import { Subject, Subscription, takeUntil } from "rxjs";
import { SelectionModel } from "@angular/cdk/collections";

@Component({
  selector: "app-depreciation",
  templateUrl: "./depreciation.component.html",
  styleUrls: ["./depreciation.component.sass"],
})
export class DepreciationComponent implements OnInit {
  //   {
  //     "id": 251,
  //     "year": 2025,
  //     "cost": 6000000,
  //     "rate": 4,
  //     "begginingValue": 3780000,
  //     "depreciation": 1110000,
  //     "residualvalue": 450000,
  //     "endyearValue": 2670000,
  //     "usefullife": 5,
  //     "assetId": "9"
  // }

  displayedColumns: string[] = [
    "id",
    "year",
    "begginingValue",
    "depreciation",
    "endyearValue",
    "cost",
    "rate",
    "residualValue",
    "usefulLife",
    "assetID",
  ];

  // displayedColumns: string[] = ['id','year','begginingValue','depreciation','endyearValue'];
  dataSource!: MatTableDataSource<DepreciationModel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  subscription!: Subscription;
  selection = new SelectionModel<DepreciationModel>(true, []);
  data: any;
  error: any;
  // employeeEmail: any;
  // employee_id: any;
  // creatingAccount = false;
  formData: any;

  isLoading = true;

  maintId: any;

  assetId?: any;
  assetDetail?: any;
  stringfiedData: any;
  detail: any;

  assets: AssetModel | null;

  finValid?: any;

  qrInfo: any;

  selectFeedback: "";

  Form!: FormGroup;
  floatLabelControl = new FormControl("auto");
  options = [{ name: "View" }, { name: "Add" }];

  depreciations = [
    { name: "Straight line method" },
    { name: "Reducing balance method" },
  ];

  loading = true;
  loaded = false;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private assetCrudService: AssetCrudService,
    private dialog: MatDialog,
    private snackbar: SnackbarService,
    private location: Location
  ) {
    this.route.queryParams.subscribe((params) => {
      this.assetId = params["id"];
      console.log("ID = " + this.assetId);
    });

    this.getAssetById();
  }

  ngOnInit() {}
  // ngOnDestroy(): void {

  //   this.subscription.unsubscribe();
  // }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refresh() {
    //this.getData();
    //console.log("Table Refreshed")
    this.onSubmit();
  }

  createForm(): FormGroup {
    return this.fb.group({
      assetId: [this.assetDetail.id],
      method: [this.assetDetail.depreciation_type, Validators.required],
      c: [this.assetDetail.cost, Validators.required],
      sv: ["", Validators.required],
      y: ["", Validators.required],
      rate: [this.assetDetail.depreciation_rate, Validators.required],
    });
  }

  newAsset() {
    console.log("Div 1 Clicked");
  }
  profitLoss() {
    console.log("Div 2 Clicked");
  }
  viewActions() {
    console.log("Div 3 Clicked");
  }
  pendingReq() {
    console.log("Div 4 Clicked");
  }

  // Get By ID starts
  getAssetById() {
    this.assetCrudService.getAsset(this.assetId).subscribe(
      (response) => {
        this.assetDetail = response;
        this.stringfiedData = JSON.stringify(this.assetDetail);

        console.log("details = ", this.assetDetail);

        if (this.assetDetail) {
          this.Form = this.createForm();
          this.finValid = true;
          this.loading = false;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  cancel() {
    this.location.back();
    //  let route = '/clerk/assets/details';
    // this.router.navigate([route], { queryParams: { id: this.assetDetail.id } });
    // let route = '/clerk/assets/asset-details';
    // this.router.navigate([route], { queryParams: { id: this.assetId } });
  }

  // Select Options start
  // selectVendor() {
  //   let route = "/clerk/assets/vendor";
  //   this.router.navigate([route], { queryParams: { id: this.assetDetail.id } });
  // }

  onSubmit() {
    this.assetCrudService
      .calcDepreciation(
        this.Form.value.method,
        this.Form.value.c,
        this.Form.value.sv,
        this.Form.value.y,
        this.Form.value.rate,
        this.Form.value.assetId
      )
      .pipe()
      .subscribe(
        (res) => {
          console.log("Depreciation = ", res);

          this.data = res;
          if (this.data) {
            this.isLoading = false;

            // Binding with the datasource
            this.dataSource = new MatTableDataSource(this.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.snackbar.showNotification(
              "snackbar-success",
              "Depreciation processed successfully!!"
            );
          } else {
            this.snackbar.showNotification(
              "snackbar-black",
              "Empty response..!!"
            );
          }
        },
        (err) => {
          console.log(err);
          this.snackbar.showNotification(
            "snackbar-danger",
            "Depreciation processing failed...!!"
          );
        }
      );
  }
  

  fetchData() {
    this.assetCrudService
      .getDepreciationsByAssetId(this.Form.value.assetId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res) {
            this.data = res;
            this.isLoading = false;

            // Binding with the datasource
            this.dataSource = new MatTableDataSource(this.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          } else {
            this.snackbar.showNotification("snackbar-danger", res.message);
          }
        },
        error: (err) => {
          console.log("err: ", err);
          this.snackbar.showNotification("snackbar-danger", "Server Error: !!");
        },
        complete: () => {},
      }),
      Subscription;
  }
}
