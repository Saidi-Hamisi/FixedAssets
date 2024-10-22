import { SelectionModel } from "@angular/cdk/collections";
import { DatePipe } from "@angular/common";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { takeUntil } from "rxjs";
import { AccountService } from "src/app/account/data/services/account.service";
import { LogService } from "src/app/admin/data/services/log.service";
import { Log } from "src/app/admin/data/types/log";
import { User } from "src/app/admin/data/types/user";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.sass"],
})
export class TransactionsComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "time",
    "username",
    "requesttip",
    "activity",
  ];
  logs: Log[] = [];
  dataSource!: MatTableDataSource<Log>;
  selection = new SelectionModel<Log>(true, []);
  index: number;
  id: number;
  uname: string = "";
  stime: string;
  user: User;
  userId: number;

  constructor(
    private accountService: AccountService,
    private snackbar: SnackbarService,
    private tokenStorage: TokenStorageService,
    private logService: LogService,
    private datepipe: DatePipe
  ) {
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.getUser();
    this.getUserById();

    console.log(this.datepipe.transform( Date.now(),  'yyyy/MM/dd'))

    console.log(this.uname)

    this.getDailyLogs(this.uname, this.datepipe.transform( Date.now(),  'yyyy/MM/dd'))
  }

  getUser() {
    this.uname = this.tokenStorage.getUser().username;
    
    this.userId = this.tokenStorage.getUser().id;

  }

  getUserById() {
    this.accountService.getUser(this.userId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.user = res;
          
          console.log(this.user);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getDailyLogs(uname, stime) {
    this.logService
      .todayLogs(uname, stime)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.logs = res;
          console.log(this.logs);
          this.dataSource = new MatTableDataSource<Log>(this.logs);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // context menu
  onContextMenu(event: MouseEvent, item: Log) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
