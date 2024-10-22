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
import { AddVendorComponent } from '../dialogs/add-vendor/add-vendor.component';
import { DeleteVendorComponent } from '../dialogs/delete-vendor/delete-vendor.component';
import { UpdateVendorComponent } from '../dialogs/update-vendor/update-vendor.component';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.sass']
})
export class VendorComponent implements OnInit {

  displayedColumns: string[] = ['id','vendorName','phone','email','category','address','taxid','location','actions'];
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

  vendorId: any;




constructor(
  private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private assetCrudService: AssetCrudService, private dialog: MatDialog,
) { }

ngOnInit(): void {
 
  this.route.queryParams.subscribe((params) => {
    this.vendorId = params["id"];
    console.log("ID = ", this.vendorId);
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
  this.subscription = this.assetCrudService.getVendor(this.vendorId).subscribe(res => {
   this.data = res;
   console.log("All vendors =", res);

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


addVendor(){
  const dialogConfig = new MatDialogConfig()
  dialogConfig.disableClose = false
  dialogConfig.autoFocus = true
  dialogConfig.width = '500px'
  dialogConfig.data = {
    // test:this.assetDetail
    test: this.vendorId
  }

  this.dialog.open(AddVendorComponent, dialogConfig)
}
deleteVendor(vendor) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '300px'
  dialogConfig.data = {
    vendor,
  };
  //console.log("sender to delete = "+sender.id)
  this.dialog.open(DeleteVendorComponent, dialogConfig);
}

// Create DialodBoxes
onSelect(data:any){
  //console.log("vendot to update = ", data)
  const dialogConfig = new MatDialogConfig()
  dialogConfig.disableClose = false
  dialogConfig.autoFocus = true
  dialogConfig.width = '500px'
  dialogConfig.data = {
    test: data
  }
  this.dialog.open(UpdateVendorComponent, dialogConfig)

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
