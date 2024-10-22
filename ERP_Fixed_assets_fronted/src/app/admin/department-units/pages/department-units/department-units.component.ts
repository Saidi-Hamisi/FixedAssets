import { SelectionModel } from "@angular/cdk/collections";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { takeUntil } from "rxjs";
import { DepartmentUnitsService } from "src/app/admin/data/services/department-units.service";
import { DepartmentUnit } from "src/app/admin/data/types/department-unit";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { AddDepartmentUnitComponent } from "../add-department-unit/add-department-unit.component";
import { DeleteDepartmentUnitComponent } from "../delete-department-unit/delete-department-unit.component";
import { DepartmentUnitComponent } from "../department-unit/department-unit.component";
import { UpdateDepartmentUnitComponent } from "../update-department-unit/update-department-unit.component";

@Component({
  selector: "app-department-units",
  templateUrl: "./department-units.component.html",
  styleUrls: ["./department-units.component.sass"],
})
export class DepartmentUnitsComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "departmentCode",
    "departmentName",
    "actions",
  ];
  departmentUnits: DepartmentUnit[] = [];
  dataSource: MatTableDataSource<DepartmentUnit>;
  isLoading = true;
  selection = new SelectionModel<DepartmentUnit>(true, []);
  index: number;
  id: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  constructor(
    private departmentUnitService: DepartmentUnitsService,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.getDepartmentUnits();
  }

  refresh() {
    this.getDepartmentUnits();
  }

  getDepartmentUnits() {
    this.departmentUnitService
      .getDepartmentUnits()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.departmentUnits = res;

          if(this.departmentUnits){
            this.isLoading = false
          }

          this.dataSource = new MatTableDataSource<DepartmentUnit>(
            this.departmentUnits
          );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          //console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  addUnitCall() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px"
    dialogConfig.data = {
      test: "",
    };
    this.dialog.open(AddDepartmentUnitComponent, dialogConfig);
  }

  updateDepartmentUnitCall(departmentUnit) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      departmentUnit,
    };
    this.dialog.open(UpdateDepartmentUnitComponent, dialogConfig);
  }

  deleteDepartmentUnitCall(departmentUnit){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      departmentUnit,
    };
    this.dialog.open(DeleteDepartmentUnitComponent, dialogConfig);
  }

  detailsCall(departmentUnit){
    this.dialog.open(DepartmentUnitComponent, {
      data: {
        departmentUnit: departmentUnit,
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
  onContextMenu(event: MouseEvent, item: DepartmentUnit) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }

}
