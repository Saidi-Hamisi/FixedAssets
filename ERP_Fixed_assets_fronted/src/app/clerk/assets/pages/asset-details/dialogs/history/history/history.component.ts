import { SelectionModel } from '@angular/cdk/collections';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VendorModel } from 'src/app/clerk/_model/vendor';
import { AssetCrudService } from 'src/app/clerk/_services/assetcrud.service';
import { DeleteHistoryComponent } from '../dialogs/delete-history/delete-history.component';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass']
})
export class HistoryComponent implements OnInit {

  displayedColumns: string[] = ['id','maintener','note','actions'];
  dataSource!: MatTableDataSource<VendorModel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
contextMenuPosition = { x: "0px", y: "0px" };
  subscription!: Subscription;
  selection = new SelectionModel<VendorModel>(true, []);
  data: any;
  error: any;
  // employeeEmail: any;
  // employee_id: any;
  // creatingAccount = false;
  formData:any;
  
  isLoading = true;

  maintId: any;




constructor(
  private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private assetCrudService: AssetCrudService, private dialog: MatDialog,
) { }

ngOnInit(): void {
 
  this.route.queryParams.subscribe((params) => {
    this.maintId = params["id"];
    console.log("ID = ", this.maintId);
  });  
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
  this.subscription = this.assetCrudService.getMaint(this.maintId).subscribe(res => {
   this.data = res;
   console.log("All maint = ", res);

   if(this.data){
    this.isLoading = false;
   }
  
   
    // Binding with the datasource
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
}




refresh(){
  this.getData();
  //console.log("Table Refreshed")
}


// context menu
onContextMenu(event: MouseEvent, item: VendorModel) {
  event.preventDefault();
  this.contextMenuPosition.x = event.clientX + "px";
  this.contextMenuPosition.y = event.clientY + "px";
  this.contextMenu.menuData = { item: item };
  this.contextMenu.menu.focusFirstItem("mouse");
  this.contextMenu.openMenu();
}  



deleteMaint(maint) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '300px'
  dialogConfig.data = {
    maint,
  };
  //console.log("sender to delete = "+sender.id)
  this.dialog.open(DeleteHistoryComponent, dialogConfig);
}








  newAsset() {
    console.log("Div 1 Clicked");
  }
  profitLoss() {
    console.log("Div 2 Clicked");
  }
  viewActions() {
    console.log("Div 3 Clicked");
  }
  pendingReq() {
    console.log("Div 4 Clicked");
  }

}
