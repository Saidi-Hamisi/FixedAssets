import { Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

import { Subscription } from "rxjs";

import { SelectionModel } from "@angular/cdk/collections";


import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { AssetCrudService } from "src/app/clerk/_services/assetcrud.service";
import { MatMenuTrigger } from "@angular/material/menu";

@Component({
  selector: 'app-by-custodians',
  templateUrl: './by-custodians.component.html',
  styleUrls: ['./by-custodians.component.sass']
})
export class ByCustodiansComponent implements OnInit {

  displayedColumns: string[] = ['id','name','noOfAssets','valOfAssets'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  subscription!: Subscription;
  selection = new SelectionModel<any>(true, []);
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
  //this.getData();
  
}
ngOnDestroy(): void {
  //this.subscription.unsubscribe();
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
// getData() {
//   this.subscription = this.assetsAPI.getAssetsList().subscribe(res => {
//    this.data = res;
//    //console.log("All Assets ="+JSON.stringify(res));

//    if(this.data){
//     this.isLoading = false;
//    }
  
   
//     // Binding with the datasource
//     this.dataSource = new MatTableDataSource(this.data);
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//   })
// }

// onSelect(data:any){
//   let route = '/clerk/assets/details';
//   this.router.navigate([route], { queryParams: { id: data.id } });
// } 

addAsset() {
  //console.log("clicked");
  this.router.navigate(["/clerk/assets/add"]);
}

refresh(){
  //this.getData();
  console.log("Table Refreshed")
}


  

}