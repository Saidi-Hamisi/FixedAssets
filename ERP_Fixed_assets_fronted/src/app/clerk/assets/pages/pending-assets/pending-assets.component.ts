import { SelectionModel } from '@angular/cdk/collections';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AssetModel } from 'src/app/clerk/_model/asset';
import { AssetCrudService } from 'src/app/clerk/_services/assetcrud.service';
import { PendingDetailsComponent } from './pending-details/pending-details.component';

@Component({
  selector: 'app-pending-assets',
  templateUrl: './pending-assets.component.html',
  styleUrls: ['./pending-assets.component.sass']
})
export class PendingAssetsComponent implements OnInit {

  displayedColumns: string[] = ['id','assetCode','category','assetName','acquisitionDate','cost','asset_Value','custodian','location','status','action'];
  dataSource!: MatTableDataSource<AssetModel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
contextMenuPosition = { x: "0px", y: "0px" };
  subscription!: Subscription;
  selection = new SelectionModel<AssetModel>(true, []);
  data: any;
  error: any;
 
  formData:any;
  
  isLoading = true;




constructor(
  private router: Router,
  public dialog: MatDialog,
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
  this.subscription = this.assetsAPI.getPendingList().subscribe(res => {
   this.data = res;
   console.log("Pending Requests ="+JSON.stringify(res));

   if(this.data){
    this.isLoading = false;
   }
  
   
    // Binding with the datasource
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
}


  
//   console.log("Selected data = "+ data)
// } 

refresh(){
  this.getData();
  console.log("Table Refreshed")
}

onSelect(pending:any){
  this.dialog.open(PendingDetailsComponent, {
    data: {
      data: pending,
      action: 'details',
    },
    //height: "70%",
    width: "20%",
  })
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