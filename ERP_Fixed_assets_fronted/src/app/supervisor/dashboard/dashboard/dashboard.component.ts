import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

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
export class DashboardComponent implements OnInit {
  public lineChartOptions: Partial<ChartOptions>;
  public pieChartOptions: any;
  //  color: ["#3FA7DC", "#F6A025", "#9BC311"],

  chartData: { series: number[]; labels: string[] } = {
    series: [],
    labels: [],
  };

  constructor(private router: Router) {}
  ngOnInit() {
    this.chartData = this.generateData();
    this.chart1();
    this.chart2();
  }

  assetDet() {
    //console.log("Div 1 Clicked");
    this.router.navigate(["/supervisor/assets/all-assets"]);
  }
  profitLoss() {
    console.log("Div 2 Clicked");
    //this.router.navigate(["/clerk/assets/add"]);
  }
  viewActions() {
    console.log("Div 3 Clicked");
  }
  pendingReq() {
    //console.log("Div 4 Clicked");
    this.router.navigate(["/clerk/assets/pending"]);
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

      colors: ["#83C9B3", "#B383C9", "#C9B383"],
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
          "Dec",
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

  generateRandomData(
    length: number,
    minValue: number,
    maxValue: number
  ): number[] {
    const data = [];
    for (let i = 0; i < length; i++) {
      const randomValue =
        Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      data.push(randomValue);
    }
    return data;
  }

  private chart2() {
    this.pieChartOptions = {
      series: this.chartData.series,
      chart: {
        type: "pie",
        width: 250,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      labels: this.chartData.labels,
      colors: ["#33634a", "#d74f6d", "#6d6dc8", "#c8a86d", "#6dc8a6"],
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

  // generateSeries(): number[] {
  //   const series: number[] = [];
  //   for (let i = 0; i < 3; i++) {
  //     const value = Math.floor(Math.random() * 500000) + 500000;
  //     series.push(value);
  //   }
  //   return series;
  // }
}

// series: [44, 55, 13],
// labels: ["Science", "Mathes", "Economics", "History", "Music"],
