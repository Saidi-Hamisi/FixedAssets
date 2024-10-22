import { SelectionModel } from "@angular/cdk/collections";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { takeUntil } from "rxjs";
import { LocationService } from "src/app/admin/data/services/location.service";
import { Location } from "src/app/admin/data/types/location";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { AddLocationComponent } from "../add-location/add-location.component";
import { DeleteLocationComponent } from "../delete-location/delete-location.component";
import { LocationComponent } from "../location/location.component";
import { UpdateLocationComponent } from "../update-location/update-location.component";

@Component({
  selector: "app-locations",
  templateUrl: "./locations.component.html",
  styleUrls: ["./locations.component.sass"],
})
export class LocationsComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "locationCode",
    "subcounty",
    "ward",
    "actions",
  ];
  locations: Location [] = [];
  dataSource!: MatTableDataSource<Location>;
  selection = new SelectionModel<Location>(true, []);
  index: number;
  id: number;
  isLoading = true;

  constructor(private locationService: LocationService, private dialog: MatDialog) {
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.getLocations()
  }

  refresh(){
    this.getLocations()
  }

  getLocations() {
    this.locationService
      .getLocations()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.locations = res;

          if(this.locations){
            this.isLoading = false
          }

          this.dataSource = new MatTableDataSource<Location>(this.locations);
          this.dataSource.paginator = this.paginator;
          //console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  addLocationCall(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      test: ""
    }
    this.dialog.open(AddLocationComponent, dialogConfig)
  }

  editLocationCall(location){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      location
    }
    this.dialog.open(UpdateLocationComponent, dialogConfig)
  }

  deleteLocationCall(location){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      location
    }
    this.dialog.open(DeleteLocationComponent, dialogConfig)
  }

  detailsCall(location){
    this.dialog.open(LocationComponent, {
      data: {
        location: location,
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
  onContextMenu(event: MouseEvent, item: Location) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
