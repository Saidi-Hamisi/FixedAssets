import { Component, OnInit } from '@angular/core';
// import { EChartsOption } from "echarts";
import * as echarts from 'echarts';
import { Subscription } from 'rxjs';
import { AssetCrudService } from 'src/app/supervisor/_services/assetcrud.service';

@Component({
  selector: 'app-by-cat',
  templateUrl: './by-cat.component.html',
  styleUrls: ['./by-cat.component.sass']
})
export class ByCatComponent implements OnInit {

  subscription!: Subscription;
  data: any;
  isLoading = true;

  valueArr : any = [];

  constructor(private assetsAPI:AssetCrudService) { 
    this.subscription = this.assetsAPI.getByCategories().subscribe(res => {
      this.data = res;
      console.log("Charts by Categories =", this.data[0].valueOfassets);
      this.getArrayList();
      this.createChart();
     })
  }

  ngOnInit(): void {
    
  }
 

  getArrayList() {
    //let valueArr : any = [];

    this.data.forEach((item) => {
      this.valueArr.push(item.valueOfassets); 
      
    });
    
      console.log("Array list = ", this.valueArr);
      
  }

  createChart(){
    
  } 
//donut chart
// donut_chart: EChartOption = {
//   tooltip: {
//     trigger: "item",
//     formatter: "{a} <br/>{b} : {c} ({d}%)",
//   },
//   legend: {
//     data: ["Bio", "Bldg", "Comp", "CompAcc", "Land", "Veh", "Eqpt"],
//     textStyle: {
//       color: "#9aa0ac",
//       padding: [5, 5],
//     },
//   },
//   toolbox: {
//     show: !0,
//     feature: {
//       magicType: {
//         show: !0,
//         type: ["pie", "funnel"],
//         option: {
//           funnel: {
//             x: "25%",
//             width: "50%",
//             funnelAlign: "center",
//             max: 1548,
//           },
//         },
//       },
//       restore: {
//         show: !0,
//         title: "Restore",
//       },
//       saveAsImage: {
//         show: !0,
//         title: "Save Image",
//       },
//     },
//   },
//   series: [
//     {
//       name: "Access to the resource",
//       type: "pie",
//       radius: ["35%", "55%"],
//       itemStyle: {
//         normal: {
//           label: {
//             show: !0,
//           },
//           labelLine: {
//             show: !0,
//           },
//         },
//         emphasis: {
//           label: {
//             show: !0,
//             position: "center",
//             textStyle: {
//               fontSize: "14",
//               fontWeight: "normal",
//             },
//           },
//         },
//       },
//       data: [
//         {
//           value: 200,
//           name: "Bio",
//         },
//         {
//           value: 310,
//           name: "Bldg",
//         },
//         {
//           value: 234,
//           name: "Comp",
//         },
//         {
//           value: 135,
//           name: "CompAcc",
//         },
//         {
//           value: 548,
//           name: "Land",
//         },
//         {
//           value: 548,
//           name: "Veh",
//         },
//         {
//           value: 548,
//           name: "Eqpt",
//         },
        
//       ],
//     },
//   ],
//   color: ["#575B7A", "#DE725C", "#DFC126", "#72BE81", "#50A5D8","#451e3e", "#708090"],
// };

}
