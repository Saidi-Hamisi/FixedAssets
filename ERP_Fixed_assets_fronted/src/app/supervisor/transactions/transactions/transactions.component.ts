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
import { AssetCrudService } from "src/app/clerk/_services/assetcrud.service";
import { MatMenuTrigger } from "@angular/material/menu";
import { TransactionsModel } from "../../_model/transactions";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.sass']
})
export class TransactionsComponent implements OnInit {

  displayedColumns: string[] = ['id','doneBy','fName','lName','userGroup','action','addedOn'];
  dataSource!: MatTableDataSource<TransactionsModel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  subscription!: Subscription;
  selection = new SelectionModel<TransactionsModel>(true, []);
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

onSelect(data:any){
  let route = '/clerk/assets/details';
  this.router.navigate([route], { queryParams: { id: data.id } });
} 

addAsset() {
  //console.log("clicked");
  this.router.navigate(["/clerk/assets/add"]);
}

refresh(){
  //this.getData();
  console.log("Table Refreshed")
}


  

}
