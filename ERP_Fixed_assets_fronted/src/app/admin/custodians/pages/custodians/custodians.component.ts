import { SelectionModel } from "@angular/cdk/collections";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { takeUntil } from "rxjs";
import { CustodianService } from "src/app/admin/data/services/custodian.service";
import { Custodian } from "src/app/admin/data/types/custodian";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { AddCustodianComponent } from "../add-custodian/add-custodian.component";
import { CustodianComponent } from "../custodian/custodian.component";
import { DeleteCustodianComponent } from "../delete-custodian/delete-custodian.component";
import { UpdateCustodianComponent } from "../update-custodian/update-custodian.component";

@Component({
  selector: "app-custodians",
  templateUrl: "./custodians.component.html",
  styleUrls: ["./custodians.component.sass"],
})
export class CustodiansComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "custodianCode",
    "custodianName",
    "email",
    "department",
    "actions",
  ];
  custodians: Custodian[] = [];
  dataSource: MatTableDataSource<Custodian>;
  isLoading = true;
  selection = new SelectionModel<Custodian>(true, []);
  index: number;
  id: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  constructor(private custodianService: CustodianService, private dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.getCustodians();
  }

  refresh(){
    this.getCustodians();
  }

  getCustodians() {
    this.custodianService
      .getCustodians()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.custodians = res;

          if(this.custodians){
            this.isLoading = false
          }
          
          this.dataSource = new MatTableDataSource<Custodian>(this.custodians);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  addCustodian(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      test: "Some data"
    }
    this.dialog.open(AddCustodianComponent, dialogConfig)
  }

  editCall(custodian){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      custodian
    }
    this.dialog.open(UpdateCustodianComponent, dialogConfig)

    //console.log(custodian)
  }

  deleteCall(custodian){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      custodian
    }
    this.dialog.open(DeleteCustodianComponent, dialogConfig)

    //console.log(custodian)
  }

  detailsCall(custodian){
    this.dialog.open(CustodianComponent, {
      data: {
        custodian: custodian,
        action: 'details',
      },
      width: "500px",
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // context menu
  onContextMenu(event: MouseEvent, item: Custodian) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
