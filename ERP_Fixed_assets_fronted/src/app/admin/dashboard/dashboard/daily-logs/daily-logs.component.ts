import { SelectionModel } from "@angular/cdk/collections";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { takeUntil } from "rxjs";
import { LogService } from "src/app/admin/data/services/log.service";
import { Log } from "src/app/admin/data/types/log";
import { BaseComponent } from "src/app/shared/components/base/base.component";

@Component({
  selector: "app-daily-logs",
  templateUrl: "./daily-logs.component.html",
  styleUrls: ["./daily-logs.component.sass"],
})
export class DailyLogsComponent extends BaseComponent implements OnInit {
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

  constructor(private logService: LogService) {
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.getDailyLogs(this.uname, this.stime);
  }

  getDailyLogs(uname, stime) {
    this.logService
      .todayLogs((uname = "famsadmin1"), (stime = "2022/03/1"))
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.logs = res;
          this.dataSource = new MatTableDataSource<Log>(this.logs);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(res);
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
