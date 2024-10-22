import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  ApexPlotOptions,
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

  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  public areaChartOptions: Partial<ChartOptions>;
  public barChartOptions: Partial<ChartOptions>;
  public projectOptions: Partial<ChartOptions>;
  public performanceRateChartOptions: Partial<ChartOptions>;
  

  public lineChartOptions: Partial<ChartOptions>;
  public pieChartOptions: any;
  //  color: ["#3FA7DC", "#F6A025", "#9BC311"],
  constructor(private router: Router) {}
  ngOnInit() {
    this.chart1();


    this.chart5();
  }

  newAsset() {
    //console.log("Div 1 Clicked");
    this.router.navigate(["/clerk/assets/add"]);
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

      colors: ["#9FC8D9", "#D9A69F", "#9FD9A8"],
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


  private chart5() {
    this.performanceRateChartOptions = {
      series: [
        {
          name: "Asset Value Amount",
          data: [113, 120, 130, 120, 125, 119, 126],
        },
      ],
      chart: {
        height: 380,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        foreColor: "#9aa0ac",
        toolbar: {
          show: false,
        },
      },
      colors: ["#545454"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: ["Category1", "Category2", "Category3", "Category4", "Category5", "Category6", "Category7","Category8"],
        title: {
          text: "Categories",
        },
      },
      yaxis: {
        title: {
          text: "Asset Value Amount(UGX)",
        },
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
}