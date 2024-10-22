import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AssetModel } from '../../_model/asset';
import { LeaseService } from '../../_services/leases.service';

@Component({
  selector: 'app-all-lessors',
  templateUrl: './all-lessors.component.html',
  styleUrls: ['./all-lessors.component.sass']
})
export class AllLessorsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'lessorCode', 'lessorName', 'phoneNo', 'emailAddress', 'lessorKraPin', 'regDocNo', 'postedTime', 'action'];
  dataSource!: MatTableDataSource<AssetModel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  subscription!: Subscription;
  selection = new SelectionModel<AssetModel>(true, []);
  data: any;
  error: any;
  formData: any;
  isLoading = true;
  pageFunction = "Update";
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private router: Router,
    private snackbar: SnackbarService,
    private leaseService: LeaseService,
  ) { }

  ngOnInit(): void {
    this.getData();

  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getData() {
    this.leaseService.getLessors().pipe(takeUntil(this.destroy$)).subscribe(
      {
        next: (res) => {
          if (res.statusCode == 302) {
            this.data = res.entity;
            this.isLoading = false;
            this.dataSource = new MatTableDataSource(this.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.router.navigate(["/clerk/leases/all-lessors"]);
          } else {
            this.snackbar.showNotification(
              "snackbar-danger",
              res.message
            )
          }
        },
        error: (err) => {
          this.snackbar.showNotification(
            "snackbar-danger",
            "Server Error: !!"
          );
        },
        complete: () => {

        }

      }
    ), Subscription;
  }

  // onSelect(data: any) {
  //   let route = '/clerk/assets/details';
  //   this.router.navigate([route], { queryParams: { id: data.id } });
  // }

  addLessor() {
    this.router.navigate(["/clerk/leases/manage-lessor"]);
  }

  refresh() {
    this.getData();
  }
  editLessor(row: any) {
    this.router.navigate([`/clerk/leases/manage-lessor`], { skipLocationChange: true, queryParams: { lessorData: row, pageFunction: this.pageFunction } });
  }
  viewLessor(row: any) {
    this.router.navigate([`/clerk/leases/lessor-details`], { skipLocationChange: true, queryParams: { lessorData: row } });
  }
  deleteLessor(id: number) {
    if (
      window.confirm(
        "LESSOR RECORD WILL BE DELETED PERMANENTLY!! ARE YOU SURE?"
      )
    ) {
      this.leaseService.deleteLessorPemanently(id).pipe(takeUntil(this.destroy$)).subscribe(
        {
          next: (res) => {
            if (res.statusCode == 200) {
              this.snackbar.showNotification(
                "snackbar-success",
                res.message
              );
              this.getData();
              this.router.navigate(["/clerk/leases/all-lessors"]);
            } else {
              this.snackbar.showNotification(
                "snackbar-danger",
                res.message
              )
            }
          },
          error: (err) => {
            this.snackbar.showNotification(
              "snackbar-danger",
              "Server Error: !!"
            );
          },
          complete: () => {

          }

        }
      ), Subscription;
    }
  }

}
