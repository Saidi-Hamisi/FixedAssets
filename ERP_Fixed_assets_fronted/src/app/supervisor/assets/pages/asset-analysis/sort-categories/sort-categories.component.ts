import { SelectionModel } from "@angular/cdk/collections";
import { Component, NgZone, OnInit, ViewChild } from "@angular/core";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AssetModel } from "src/app/clerk/_model/asset";
import { AssetCrudService } from "src/app/supervisor/_services/assetcrud.service";

@Component({
  selector: "app-sort-categories",
  templateUrl: "./sort-categories.component.html",
  styleUrls: ["./sort-categories.component.sass"],
})
export class SortCategoriesComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "assetCode",
    "category",
    "assetName",
    "acquisitionDate",
    "custodian",
    "location",
  ];
  dataSource!: MatTableDataSource<AssetModel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  subscription!: Subscription;
  selection = new SelectionModel<AssetModel>(true, []);
  data: any;
  error: any;
  // employeeEmail: any;
  // employee_id: any;
  // creatingAccount = false;
  formData: any;
  selectedCat: any;
  isLoading = true;

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

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private assetsAPI: AssetCrudService
  ) {}

  ngOnInit(): void {
    this.getData();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  applyFilter(event: any) {
    this.selectedCat = event.value;

    this.dataSource.data = null;
    this.isLoading = true;
    console.log(event.value);
    if (this.selectedCat == "All") {
      this.getData();
    } else {
      this.getSortByCat(this.selectedCat);
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getData() {
    this.subscription = this.assetsAPI.getAssetsList().subscribe((res) => {
      this.data = res;

      if (this.data) {
        this.isLoading = false;
      }
      // Binding with the datasource
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getSortByCat(category: string) {
    this.subscription = this.assetsAPI
      .getSortByCategories(category)
      .subscribe((res) => {
        this.data = res;

        if (this.data) {
          this.isLoading = false;
        }
        // Binding with the datasource
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  onSelect(data: any) {
    let route = "/supervisor/assets/single-asset";
    this.router.navigate([route], { queryParams: { id: data.id } });
  }

  addAsset() {
    //console.log("clicked");
    this.router.navigate(["/clerk/assets/add"]);
  }

  refresh() {
    this.getData();
    console.log("Table Refreshed");
  }

  // context menu
  onContextMenu(event: MouseEvent, item: AssetModel) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
