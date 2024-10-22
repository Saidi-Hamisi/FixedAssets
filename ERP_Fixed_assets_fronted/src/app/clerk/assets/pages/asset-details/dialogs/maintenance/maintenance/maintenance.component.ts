import { SelectionModel } from "@angular/cdk/collections";
import { Component, NgZone, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { VendorModel } from "src/app/clerk/_model/vendor";
import { AssetCrudService } from "src/app/clerk/_services/assetcrud.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { AddMaintenanceComponent } from "../dialogs/add-maintenance/add-maintenance.component";
import { DeleteMaintenanceComponent } from "../dialogs/delete-maintenance/delete-maintenance.component";
import { UpdateMaintenanceComponent } from "../dialogs/update-maintenance/update-maintenance.component";

@Component({
  selector: "app-maintenance",
  templateUrl: "./maintenance.component.html",
  styleUrls: ["./maintenance.component.sass"],
})
export class MaintenanceComponent implements OnInit {
  // displayedColumns: string[] = ['id','maintainer','maintenanceDate','nextMaintenance','status'];
  displayedColumns: string[] = [
    "maintainer",
    "freequency",
    "maintDate",
    "nextMaintDate",
    "remainingDays",
    "note",
    "status",
  ];
  // 'assetCode','assetName','custodian'
  // ,'maintainer','maintenanceDate','nextMaintenance','status'
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  subscription!: Subscription;
  selection = new SelectionModel<any>(true, []);
  data: any;
  constData: any;
  maintArr: any = [];
  maint: any = [];
  error: any;
  // employeeEmail: any;
  // employee_id: any;
  // creatingAccount = false;
  formData: any;

  isLoading = true;
  isMaint: boolean;

  maintId: any;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private snackbar: SnackbarService,
    private route: ActivatedRoute,
    private assetCrudService: AssetCrudService,
    private dialog: MatDialog
  ) {
    this.route.queryParams.subscribe((params) => {
      this.maintId = params["id"];
      console.log("ID = ", this.maintId);
    });
  }

  ngOnInit(): void {
    this.getData();
  }
  // ngOnDestroy(): void {

  //   this.subscription.unsubscribe();
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  maintenanceDataExist = false; 
  getData() {
    this.subscription = this.assetCrudService
      .getMaint(this.maintId)
      .subscribe((res) => {
        this.data = res;
        console.log("All Maintenance details =", res);

        if (this.data) {
          this.isLoading = false;
        }
        if (this.data.length > 0) {
          this.maintenanceDataExist = true;
        }

        // Binding with the datasource
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  refresh() {
    this.getData();
    //console.log("Table Refreshed")
  }

  addMaint() {
    console.log("hi", this.data);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      // test:this.assetDetail
      test: this.maintId,
    };

    this.dialog.open(AddMaintenanceComponent, dialogConfig);

    // if(!this.data){

    //  }else{
    //   this.snackbar.showNotification('snackbar-black', "Maintenance details for this asset already exist!!")
    //  }
  }
  deleteMaint(maint) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "300px";
    dialogConfig.data = {
      maint,
    };
    //console.log("sender to delete = "+sender.id)
    this.dialog.open(DeleteMaintenanceComponent, dialogConfig);
  }

  // Create DialodBoxes
  onSelect(data: any) {
    //console.log("vendot to update = ", data)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      test: data,
    };
    this.dialog.open(UpdateMaintenanceComponent, dialogConfig);
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
}
