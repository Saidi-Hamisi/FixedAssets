import { SelectionModel } from '@angular/cdk/collections';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AssetModel } from 'src/app/clerk/_model/asset';
import { ProfitLossModel } from 'src/app/clerk/_model/profitLoss';
import { AssetCrudService } from 'src/app/clerk/_services/assetcrud.service';

@Component({
  selector: 'app-profit-loss',
  templateUrl: './profit-loss.component.html',
  styleUrls: ['./profit-loss.component.sass']
})
export class ProfitLossComponent implements OnInit {

  displayedColumns: string[] = ['id','assetName','assetCode','disposalValue','remarks','ammount','assetCost','dateAdded','profit_OR_loss','status','assetState'];
  // 'disposalType',
  dataSource!: MatTableDataSource<ProfitLossModel>;
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
  this.subscription = this.assetsAPI.getProfitLoss().subscribe(res => {
   this.data = res;
   console.log("Profit/Loss = ", res);

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
  let route = '/clerk/assets/details';
  this.router.navigate([route], { queryParams: { id: data.id } });
} 

addAsset() {
  //console.log("clicked");
  this.router.navigate(["/clerk/assets/add"]);
}

refresh(){
  this.getData();
  console.log("Table Refreshed")
}

newAsset() {
  //console.log("Div 1 Clicked");
  this.router.navigate(["/clerk/assets/add"]);
}
profitLoss() {
  //console.log("Div 2 Clicked");
  //this.router.navigate(["/clerk/assets/add"]);
}
viewActions() {
  //console.log("Div 3 Clicked");
}
pendingReq() {
  //console.log("Div 4 Clicked");
  this.router.navigate(["/clerk/assets/pending"]);
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