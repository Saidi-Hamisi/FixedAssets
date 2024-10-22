import { SelectionModel } from "@angular/cdk/collections";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { takeUntil } from "rxjs";
import { AssetMovementService } from "src/app/admin/data/services/asset-movement.service";
import { AssetMovement } from "src/app/admin/data/types/asset-movement";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { AddAssetMovementComponent } from "../add-asset-movement/add-asset-movement.component";
import { AssetMovementDetailsComponent } from "../asset-movement-details/asset-movement-details.component";
import { DeleteAssetMovementComponent } from "../delete-asset-movement/delete-asset-movement.component";
import { UpdateAssetMovementComponent } from "../update-asset-movement/update-asset-movement.component";

@Component({
  selector: "app-asset-movements",
  templateUrl: "./asset-movements.component.html",
  styleUrls: ["./asset-movements.component.sass"],
})
export class AssetMovementsComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "scheduleItem",
    "land",
    "buildings",
    "computers",
    "furniture",
    "vehicles",
    "equipment",
    "currentAssets",
    "biologicalAssets",
    "total",
    "actions",
  ];
  assetMovements: AssetMovement[] = [];
  dataSource: MatTableDataSource<AssetMovement>;
  isLoading = true;
  selection = new SelectionModel<AssetMovement>(true, []);
  index: number;
  id: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  constructor(
    public dialog: MatDialog,
    private assetMovementService: AssetMovementService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAssetMovements();
  }

  refresh() {
    this.getAssetMovements();
  }

  getAssetMovements() {
    this.assetMovementService
      .getAssetMovements()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.assetMovements = res;

          if (this.assetMovements) {
            this.isLoading = false;
          }

          this.dataSource = new MatTableDataSource<AssetMovement>(
            this.assetMovements
          );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  addAssetMovementCall() {
    this.dialog.open(AddAssetMovementComponent, {
      data: {
        assetMovement: "",
        action: "details",
      },
      width: "500px",
    });
  }

  updateAssetMovementCall(assetMovement){
    this.dialog.open(UpdateAssetMovementComponent, {
      data: {
        assetMovement: assetMovement,
        action: "update",
      },
      width: "500px",
    })
  }

  viewAssetDetailsCall(assetMovement){
    this.dialog.open(AssetMovementDetailsComponent, {
      data: {
        assetMovement: assetMovement,
        action: "delete",
      },
      width: "500px",
    })
  }

  deleteAssetMovementCall(assetMovement){
    this.dialog.open(DeleteAssetMovementComponent, {
      data: {
        assetMovement: assetMovement,
        action: "details",
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
  onContextMenu(event: MouseEvent, item: AssetMovement) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
