import { SelectionModel } from "@angular/cdk/collections";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { takeUntil } from "rxjs";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { LogService } from "../../data/services/log.service";
import { Log } from "../../data/types/log";

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexLegend,
  ApexFill,
  ApexResponsive,
} from "ng-apexcharts";
import { MatDialog } from "@angular/material/dialog";
import { LogComponent } from "./log/log.component";
import { UserService } from "../../data/services/user.service";
import { User } from "../../data/types/user";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TokenStorageService } from "src/app/core/service/token-storage.service";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.sass"],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  public lineChartOptions: Partial<ChartOptions>;
  public pieChartOptions: any;
  lookUpForm: FormGroup;

  displayedColumns: string[] = [
    "id",
    "time",
    "username",
    "requesttip",
    "activity",
  ];
  logs: Log[] = [];
  users: User[] = [];
  dataSource!: MatTableDataSource<Log>;
  selection = new SelectionModel<Log>(true, []);
  index: number;
  id: number;
  uname: string;
  userId: number;

  chartData: { series: number[]; labels: string[] } = {
    series: [],
    labels: [],
  };

  constructor(
    private logService: LogService,
    private userService: UserService,
    public dialog: MatDialog,
    public fb: FormBuilder,
    private tokenStorage: TokenStorageService
  ) {
    super();
    

    this.lookUpForm = this.createLookUpForm();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {

    this.chartData = this.generateData();

    this.chart1();
    this.chart2();

    this.getUser();

    this.dailyLogs();
  }

  createLookUpForm(): FormGroup {
    return this.fb.group({
      uname: ["", [Validators.required]],
      stime: ["", [Validators.required]],
    });
  }

  dailyLogs() {
    console.log(this.lookUpForm.value.stime);

    this.logService
      .getDailyLogs(this.uname)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.logs = res;
          //console.log(res)
          this.dataSource = new MatTableDataSource<Log>(this.logs);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getUsers() {
    this.userService
      .getUsers()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.users = res;
          console.log(this.users);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  detailsCall(log) {
    this.dialog.open(LogComponent, {
      data: {
        log: log,
        action: "details",
      },
      //height: "70%",
      width: "35%",
    });
  }

  getUser() {
    this.uname = this.tokenStorage.getUser().username;

    this.userId = this.tokenStorage.getUser().id;
  }

 

private chart1() {
  this.lineChartOptions = {
    series: [
      {
        name: "Category 1",
        data: this.generateRandomData(12, 10000, 50000),
      },
      {
        name: "Category 2",
        data: this.generateRandomData(12, 10000, 50000),
      },
      {
        name: "Category 3",
        data: this.generateRandomData(12, 10000, 50000),
      },
    ],
    chart: {
      height: 350,
      type: "line",
      foreColor: "#9aa0ac",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false,
      },
    },
  

    colors: ["#B08A25", "#25949F", "#944F25"],
    stroke: {
      curve: "smooth",
    },
    grid: {
      row: {
        colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    markers: {
      size: 3,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
        ],
      title: {
        text: "Month",
      },
    },
    yaxis: {
      // opposite: true,
      title: {
        text: "Asset Category Value (UGX)",
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
    tooltip: {
      theme: "dark",
      marker: {
        show: true,
      },
      x: {
        show: true,
      },
    },
  };
}

generateRandomData(length: number, minValue: number, maxValue: number): number[] {
  const data = [];
  for (let i = 0; i < length; i++) {
    const randomValue = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    data.push(randomValue);
  }
  return data;
}


  private chart2() {
    this.pieChartOptions = {
      series:  this.chartData.series,
      chart: {
        type: "donut",
        width: 225,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      labels:  this.chartData.labels,
      colors: ["#467fc5","#c5468b","#7cc546","#4a67c5","#c58646"],
      responsive: [
        {
          breakpoint: 480,
          options: {},
        },
      ],
    };
  }



  generateData(): { series: number[]; labels: string[] } {
    const data = { series: [], labels: ["Kampala", "Jinja", "Mbarara"] };
    for (let i = 0; i < 3; i++) {
      const value = Math.floor(Math.random() * 500000) + 500000;
      data.series.push(value);
    }
    return data;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // context menu
  onContextMenu(event: MouseEvent, item: Log) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
