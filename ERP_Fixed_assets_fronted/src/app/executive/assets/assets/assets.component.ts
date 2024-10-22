import { SelectionModel } from "@angular/cdk/collections";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { AssetService } from "../../data/services/asset.service";
import { Asset } from "../../data/types/asset";

@Component({
  selector: "app-assets",
  templateUrl: "./assets.component.html",
  styleUrls: ["./assets.component.sass"],
})
export class AssetsComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "assetCode",
    "category",
    "assetName",
    "acquisitionDate",
    "cost",
    "departmentUnit",
    "custodian",
    "location",
    "status",
  ];
  assets: Asset[] = [];
  dataSource!: MatTableDataSource<Asset>;
  selection = new SelectionModel<Asset>(true, []);
  isLoading = true;
  selectedCategory: string;

  categories = [
    { name: "All" },
    { name: "Furniture" },
    { name: "Land" },
    { name: "Buildings" },
    { name: "Motor Vehicles" },
    { name: "Computers" },
    { name: "Computer Accessories" },
    { name: "Equipment" },
    { name: "Current Assets" },
    { name: "Biological Assets" },
  ];


  constructor(private assetService: AssetService, private router: Router) {
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    //this.getAssets();
    this.getAllAssets();
  }

  refresh() {}

  getAssetsByCategory(category) {
    this.assetService
      .filterAssetByCategory(category)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.assets = res;
          //console.log(this.assets);

          if (this.assets) {
            this.isLoading = false;
          }

          this.dataSource = new MatTableDataSource<Asset>(this.assets);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getAllAssets() {
    this.assetService
      .getAssets()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.assets = res;

          if (this.assets) {
            this.isLoading = false;
          }

          this.dataSource = new MatTableDataSource<Asset>(this.assets);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
           console.log(this.assets);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  sortAssetsByCategory(event: any){
    this.selectedCategory = event.value;

    this.dataSource.data = null;
    this.isLoading = true;
    console.log(event.value);
    if (this.selectedCategory == "All") {
      this.getAllAssets();
    } else {
      this.getAssetsByCategory(this.selectedCategory)
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  assetDetails(assetId){
    this.router.navigate([`/executive/assets/${assetId}`]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // context menu
  onContextMenu(event: MouseEvent, item: Asset) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
