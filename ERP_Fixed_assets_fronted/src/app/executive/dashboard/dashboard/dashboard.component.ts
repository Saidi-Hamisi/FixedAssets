import { SelectionModel } from "@angular/cdk/collections";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexFill,
  ApexMarkers,
  ApexGrid,
  ApexTitleSubtitle,
  ApexResponsive,
} from "ng-apexcharts";
import { takeUntil } from "rxjs";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { AnalyticsService } from "../../data/services/analytics.service";
import { AssetService } from "../../data/services/asset.service";
import { Asset } from "../../data/types/asset";
import { AssetCategory } from "../../data/types/asset-category";
import { AssetDepartmentUnit } from "../../data/types/asset-department-unit";
import { AssetLocation } from "../../data/types/asset-location";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  colors: string[];
  labels: string[];
  markers: ApexMarkers;
  grid: ApexGrid;
  title: ApexTitleSubtitle;
};

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "assetCode",
    "category",
    "assetName",
    "acquisitionDate",
    "cost",
    "departmentUnit",
    "custodian",
    "location",
    //"status",
  ];
  assets: Asset[] = [];
  dataSource!: MatTableDataSource<Asset>;
  selection = new SelectionModel<Asset>(true, []);
  isLoading = true;
  selectedCategory: string;
  distributionByLocation: AssetLocation[] = [];
  subcounties: string[] = [];
  assetValue: number[] = [];
  numberOfAssets: number[] = [];
  assetValueByCategory: AssetCategory[] = [];
  assetCategories: string[] = [];
  assetCategoryValue: number[] = [];
  distributionOfAssetsInDepartmentUnits: AssetDepartmentUnit[] = [];
  numberOfAssetsByDepartmentunit: number[] = [];
  departmentUnits: string[] = [];

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
    private assetService: AssetService,
    private analyticsService: AnalyticsService
  ) {
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.getAllAssets();

    this.assetsDistributionByLocation();

    this.assetValueByCategories();

    this.numberOfAssetsByDepartmentUnit();
  }

  refresh() {
    this.getAllAssets();
  }

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

  sortAssetsByCategory(event: any) {
    this.selectedCategory = event.value;

    this.dataSource.data = null;
    this.isLoading = true;
    console.log(event.value);
    if (this.selectedCategory == "All") {
      this.getAllAssets();
    } else {
      this.getAssetsByCategory(this.selectedCategory);
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  assetsDistributionByLocation() {
    this.analyticsService
      .assetDistributionByLocation()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.distributionByLocation = res;

          this.distributionByLocation.forEach((asset) => {
            this.subcounties.push(asset.subcounty);

            this.assetValue.push(asset.valueOfAssets);

            this.numberOfAssets.push(asset.numberOfAssets);
          });

          console.log(this.subcounties);

          console.log(this.assetValue);

          console.log(this.numberOfAssets);

          console.log(this.distributionByLocation);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  assetValueByCategories() {
    this.analyticsService
      .assetValueByCategory()
      .pipe(takeUntil(this.subject))
      .subscribe((res) => {
        this.assetValueByCategory = res;

        console.log(this.assetValueByCategory);

        this.assetValueByCategory.forEach((assetCategory) => {
          this.assetCategories.push(assetCategory.category);
          this.assetCategoryValue.push(assetCategory.valueOfAssets);
        });
      });
  }

  numberOfAssetsByDepartmentUnit() {
    this.analyticsService
      .numberOfAssetsByDepartmentUnit()
      .pipe(takeUntil(this.subject))
      .subscribe((res) => {
        this.distributionOfAssetsInDepartmentUnits = res;

        if (this.distributionOfAssetsInDepartmentUnits) {
          this.distributionOfAssetsInDepartmentUnits.forEach(
            (assetDepartmentUnit) => {
              this.numberOfAssetsByDepartmentunit.push(
                assetDepartmentUnit.numberOfAssets
              );

              this.departmentUnits.push(assetDepartmentUnit.department_unit);
            }
          );
        }
      });
  }

  // pie chart start
  public pieChartLabels: string[] = this.assetCategories;
  public pieChartData: number[] = this.assetValue;
  public pieChartType = "pie";
  public pieChartColors: any[] = [
    {
      backgroundColor: ["#60A3F6", "#7C59E7", "#DD6811", "#5BCFA5", "#3BCF6A", "#3843EF", "#1F4321", "#18A3E9", "#58432B", "#2F437B", "#41A38C", "#513B8D", "#611A8B", "#721B3C", "#8C12B2"],
    },
  ];
  public pieChartOptions: any = {
    animation: false,
    responsive: true,
    legend: {
      display: true,
      labels: {
        fontColor: "#9aa0ac",
      },
    },
  };

  public pieChartLabels1: string[] = this.subcounties;
  public pieChartData1: number[] = this.assetCategoryValue;
  public pieChartType1 = "pie";
  public pieChartColors1: any[] = [
    {
      backgroundColor: ["#60A3F6", "#575B7A", "#DD6811", "#5BCFA5", "#3BCF6A", "#3843EF", "#1F4321", "#18A3E9", "#58432B", "#2F437B", "#41A38C", "#513B8D", "#611A8B", "#721B3C", "#8C12B2"],
    },
  ];
  public pieChartOptions1: any = {
    animation: false,
    responsive: true,
    legend: {
      display: true,
      labels: {
        fontColor: "#9aa0ac",
      },
    },
  };
  // pie chart end

  // Doughnut chart start
  public doughnutChartLabels: string[] = this.subcounties;
  public doughnutChartData: number[] = this.numberOfAssets;
  public doughnutChartLegend = false;
  public doughnutChartColors: any[] = [
    {
      backgroundColor: ["#735A84", "#E76412", "#9BC311", "#DC3545", "#3BCF6A", "#3843EF", "#1F4321", "#18A3E9", "#58432B", "#2F437B", "#41A38C", "#513B8D", "#611A8B", "#721B3C", "#8C12B2"],
    },
  ];
  public doughnutChartType = "doughnut";
  public doughnutChartOptions: any = {
    animation: false,
    responsive: true,
  };

  public doughnutChartLabels1: string[] = this.departmentUnits;
  public doughnutChartData1: number[] = this.numberOfAssetsByDepartmentunit;
  public doughnutChartLegend1 = false;
  public doughnutChartColors1: any[] = [
    {
      backgroundColor: ["#735A84", "#E76412", "#9BC311", "#DC3545", "#3BCF6A", "#3843EF", "#1F4321", "#18A3E9", "#58432B", "#2F437B", "#41A38C", "#513B8D", "#611A8B", "#721B3C", "#8C12B2"],
    },
  ];
  public doughnutChartType1 = "doughnut";
  public doughnutChartOptions1: any = {
    animation: false,
    responsive: true,
  };

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
