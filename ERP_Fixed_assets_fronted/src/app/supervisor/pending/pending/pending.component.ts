import { Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

import { Subscription } from "rxjs";
import { map } from "rxjs/operators";

import { SelectionModel } from "@angular/cdk/collections";

import { AssetModel } from "../../_model/asset";
import { AssetCrudService } from "../../_services/assetcrud.service";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { RejectComponent } from "../dialogs/reject/reject.component";
import { ApproveComponent } from "../dialogs/approve/approve.component";


@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.sass']
})
export class PendingComponent implements OnInit
{
  displayedColumns: string[] = ['id','assetCode','category','assetName','dateAcquired','cost','asset_Value','custodian','location','action','status','approve','reject'];
  dataSource!: MatTableDataSource<AssetModel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

contextMenuPosition = { x: "0px", y: "0px" };
  subscription!: Subscription;
  selection = new SelectionModel<AssetModel>(true, []);
  data: any;
  error: any;
  
  formData:any;
  
  isLoading = true;




constructor(
  private router: Router,
    private ngZone: NgZone,
    private assetsAPI:AssetCrudService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
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
  this.subscription = this.assetsAPI.getPendingList().subscribe(res => {
   this.data = res;
   console.log("Pending Requests =", res);

   if(this.data){
    this.isLoading = false;
   }
  
   
    // Binding with the datasource
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
}

onSelect(data:any){
  
  //console.log("Selected data = ", data);
  let route = '/supervisor/pending/pending-details';
    this.router.navigate([route], { queryParams: { id: data.id } });
} 


refresh(){
  this.getData();
  console.log("Table Refreshed")
}


rejectReq(req) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '500px'
  dialogConfig.data = {
    req,
  };
  
  this.dialog.open(RejectComponent, dialogConfig);
}
approveReq(req) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '300px'
  dialogConfig.data = {
    req,
  };
  
  this.dialog.open(ApproveComponent, dialogConfig);
}

 

}
