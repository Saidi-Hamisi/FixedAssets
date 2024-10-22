import { SelectionModel } from '@angular/cdk/collections';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AssetModel } from '../../_model/asset';
import { AssetCrudService } from '../../_services/assetcrud.service';
import { LeaseService } from '../../_services/leases.service';

@Component({
  selector: 'app-all-leases',
  templateUrl: './all-leases.component.html',
  styleUrls: ['./all-leases.component.sass']
})
export class AllLeasesComponent implements OnInit {


  displayedColumns: string[] = ['id', 'leaseContractNo','leaseType', 'lessorCode', 'lessorAccountNo', 'leaseClassification', 'paymentFrequency', 'startDate','viewAmortization', 'action'];

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
  formData: any;

  isLoading = true;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private leaseService: LeaseService
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
    this.subscription = this.leaseService.getLeasses().subscribe(res => {
      this.data = res;
      console.log("All Leases =", res);



      if (this.data) {
        // Binding with the datasource
        this.dataSource = new MatTableDataSource(this.data.entity);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      }



    })
  }

  onSelect(data: any) {
    let route = '/clerk/leases/lease-details';
    this.router.navigate([route], { queryParams: { id: data.id } });
  }

  // onSelectArmotization(data: any) {
  //   let route = '/clerk/leases/accounting';
  //   this.router.navigate([route], { queryParams: { id: data.id } });
  // }

  // onSelectArmotization(data: any) {
  //   let route = '/clerk/leases/accounting';
  //   this.router.navigate([route], { queryParams: { id: data.id, additionalData: data } });
  // }

  onSelectArmotization(data: any) {
    const additionalData = data;
    const serializedData = JSON.stringify(additionalData);
  
    let route = '/clerk/leases/accounting';
    this.router.navigate([route], { queryParams: { id: data.id, additionalData: serializedData } });
  }
  

  addLease() {
    //console.log("clicked");
    this.router.navigate(["/clerk/leases/manage-lease"]);
  }

  refresh() {
    this.getData();
    console.log("Table Refreshed")
  }


}
