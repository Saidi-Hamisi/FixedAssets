import { SelectionModel } from "@angular/cdk/collections";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { takeUntil } from "rxjs";
import { UserService } from "src/app/admin/data/services/user.service";
import { User } from "src/app/admin/data/types/user";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { RestoreAccountComponent } from "../restore-account/restore-account.component";
import { UserComponent } from "../user/user.component";

@Component({
  selector: "app-deleted-accounts",
  templateUrl: "./deleted-accounts.component.html",
  styleUrls: ["./deleted-accounts.component.sass"],
})
export class DeletedAccountsComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "username",
    "firstname",
    "lastname",
    "email",
    "status",
    "phonenumber",
    "actions",
  ];

  deletedAccounts: User[] = [];
  dataSource!: MatTableDataSource<User>;
  selection = new SelectionModel<User>(true, []);
  index: number;
  id: number;
  isLoading = true;

  constructor(private userService: UserService,  public dialog: MatDialog) {
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.getDeletedAccounts();
  }

  refresh(){
    this.getDeletedAccounts();
  }

  getDeletedAccounts() {
    this.userService
      .getDeletedAccounts()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.deletedAccounts = res;

          if(this.deletedAccounts){
            this.isLoading = false;
          }
          this.dataSource = new MatTableDataSource<User>(this.deletedAccounts);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          //console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  detailsCall(user){
    this.dialog.open(UserComponent, {
      data: {
        user: user,
        action: 'details',
      },
      //height: "70%",
      width: "35%",
    })
  }

  restoreUserAccountCall(user){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      user
    }
    this.dialog.open(RestoreAccountComponent, dialogConfig)

    //console.log(user)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // context menu
  onContextMenu(event: MouseEvent, item: User) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
