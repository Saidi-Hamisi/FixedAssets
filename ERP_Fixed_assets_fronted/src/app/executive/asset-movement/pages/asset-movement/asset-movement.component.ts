import { SelectionModel } from "@angular/cdk/collections";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { takeUntil } from "rxjs";
import { AssetMovementService } from "src/app/executive/data/services/asset-movement.service";
import { AssetMovement } from "src/app/executive/data/types/asset-movement";
import { BaseComponent } from "src/app/shared/components/base/base.component";

@Component({
  selector: "app-asset-movement",
  templateUrl: "./asset-movement.component.html",
  styleUrls: ["./asset-movement.component.sass"],
})
export class AssetMovementComponent extends BaseComponent implements OnInit {
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

  constructor(private assetMovementService: AssetMovementService) {
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
}
