import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { ProfitLossService } from 'src/app/executive/data/services/profit-loss.service';
import { ProfitLoss } from 'src/app/executive/data/types/profit-loss';
import { BaseComponent } from 'src/app/shared/components/base/base.component';

@Component({
  selector: 'app-profit-loss',
  templateUrl: './profit-loss.component.html',
  styleUrls: ['./profit-loss.component.sass']
})
export class ProfitLossComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "assetName",
    "assetCode",
    "disposalValue",
    "remarks",
    "ammount",
    "assetCost",
    "dateAdded",
    "profit_OR_loss",
    "status",
    "assetState",
  ];
  profitLoss: ProfitLoss [] = [];
  dataSource: MatTableDataSource<ProfitLoss>;
  isLoading = true;
  selection = new SelectionModel<ProfitLoss>(true, []);
  index: number;
  id: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  constructor(private profitLossService: ProfitLossService, private router: Router) {
    super();
   }

  ngOnInit(): void {
    this.profitOrLossOnDisposal();
  }

  profitOrLossOnDisposal(){
    this.profitLossService.profitOrLossOnDisposal().pipe(takeUntil(this.subject)).subscribe(res => {
      this.profitLoss = res;

      if(this.profitLoss){
        this.isLoading = false;
      }

      console.log(this.profitLoss)

       this.dataSource = new MatTableDataSource(this.profitLoss);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
    })
  }

  viewAssetDetails(assetId){
    this.router.navigate([`/executive/assets/${assetId}`])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // context menu
  onContextMenu(event: MouseEvent, item: ProfitLoss) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }

}
