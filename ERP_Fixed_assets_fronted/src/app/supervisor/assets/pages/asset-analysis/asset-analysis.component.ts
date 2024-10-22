import { Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

import { Subscription } from "rxjs";
import { map } from "rxjs/operators";

import { SelectionModel } from "@angular/cdk/collections";



import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { AssetModel } from "src/app/clerk/_model/asset";
import { AssetCrudService } from "src/app/clerk/_services/assetcrud.service";
import { MatMenuTrigger } from "@angular/material/menu";


@Component({
  selector: 'app-asset-analysis',
  templateUrl: './asset-analysis.component.html',
  styleUrls: ['./asset-analysis.component.sass']
})
export class AssetAnalysisComponent implements OnInit {

  displayedColumns: string[] = ['id','assetCode','category','assetName','acquisitionDate','custodian','location'];
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
  formData:any;
  
  isLoading = true;

   



constructor(
  private router: Router,
    private ngZone: NgZone,
    private assetsAPI:AssetCrudService
) { }

ngOnInit(): void {
  this.getData();
  
}
ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
getData() {
  this.subscription = this.assetsAPI.getAssetsList().subscribe(res => {
   this.data = res;
   //console.log("All Assets ="+JSON.stringify(res));

   if(this.data){
    this.isLoading = false;
   }
  
   
    // Binding with the datasource
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
}

// onSelect(data:any){
//   let route = '/clerk/assets/details';
//   this.router.navigate([route], { queryParams: { id: data.id } });
// } 

addAsset() {
  //console.log("clicked");
  this.router.navigate(["/clerk/assets/add"]);
}

refresh(){
  this.getData();
  console.log("Table Refreshed")
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
