import { SelectionModel } from "@angular/cdk/collections";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { takeUntil } from "rxjs";
import { DepartmentService } from "src/app/admin/data/services/department.service";
import { Department } from "src/app/admin/data/types/department";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { AddDepartmentComponent } from "../add-department/add-department.component";
import { DeleteDepartmentComponent } from "../delete-department/delete-department.component";
import { DepartmentComponent } from "../department/department.component";
import { UpdateDepartmentComponent } from "../update-department/update-department.component";

@Component({
  selector: "app-departments",
  templateUrl: "./departments.component.html",
  styleUrls: ["./departments.component.sass"],
})
export class DepartmentsComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "departmentCode",
    "departmentName",
    "actions",
  ];
  departments: Department[] = [];
  dataSource!: MatTableDataSource<Department>;
  selection = new SelectionModel<Department>(true, []);
  index: number;
  id: number;
  isLoading = true;

  constructor(private departmentService: DepartmentService, private dialog: MatDialog) {
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };


  ngOnInit(): void {
    this.getDepartments();
  }

  refresh(){
    this.getDepartments();
  }

  getDepartments() {
    this.departmentService
      .getDepartments()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.departments = res;

          if(this.departments){
            this.isLoading = false
          }

          console.log(this.departments);
          
          this.dataSource = new MatTableDataSource<Department>(this.departments);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          //console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  addDepartmentCall(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      test: ""
    }
    this.dialog.open(AddDepartmentComponent, dialogConfig)
  }

  editDepartmentCall(department){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      department
    }
    this.dialog.open(UpdateDepartmentComponent, dialogConfig)
  }

  deleteDepartmentCall(department){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      department
    }
    this.dialog.open(DeleteDepartmentComponent, dialogConfig)
  }

  detailsCall(department){
    this.dialog.open(DepartmentComponent, {
      data: {
        department: department,
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
  onContextMenu(event: MouseEvent, item: Department) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
