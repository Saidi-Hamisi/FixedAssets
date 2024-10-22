import { SelectionModel } from "@angular/cdk/collections";
import { DatePipe } from "@angular/common";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { takeUntil } from "rxjs";
import { AccountService } from "src/app/account/data/services/account.service";
import { Log } from "src/app/admin/data/types/log";
import { BaseComponent } from "src/app/shared/components/base/base.component";

@Component({
  selector: "app-user-logs",
  templateUrl: "./user-logs.component.html",
  styleUrls: ["./user-logs.component.sass"],
})
export class UserLogsComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "time",
    "username",
    "requesttip",
    "activity",
  ];
  accountId: number;
  username: string;
  logs: Log[] = [];
  dialyLogs: Log[] = [];
  isLoading: boolean = true;

  dataSource!: MatTableDataSource<Log>;
  selection = new SelectionModel<Log>(true, []);

  constructor(
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
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
    this.activatedRoute.params.subscribe((param) => {
      this.accountId = param.id;
      console.log(this.accountId);
    });

    this.getAccountUsername(this.accountId);
  }

  getAccountUsername(id) {
    this.accountService
      .getUser(id)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          //console.log(res);

          this.username = res.username;

          this.getAccountLogs(this.username);

          console.log(this.username);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getAccountLogs(username) {
    this.accountService
      .getUserLogs(username)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.logs = res;

          if(this.logs){
            this.isLoading = false
          }

          console.log(this.logs)

          this.dataSource = new MatTableDataSource<Log>(this.logs);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  selectDate(event: MatDatepickerInputEvent<Date>) {
    console.log(this.username);
    this.accountService
      .getUserDailyLogs(
        this.username,
        this.datepipe.transform(event.value, "yyyy/MM/dd")
      )
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log(res);
          this.dialyLogs = res;

          console.log(this.dialyLogs);

          if (this.dialyLogs) {
            this.isLoading = false;
            this.dataSource.data = null;

            this.dataSource = new MatTableDataSource(this.dialyLogs);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        },
        (err) => {
          console.log(err);
        }
      );

    //console.log();
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
