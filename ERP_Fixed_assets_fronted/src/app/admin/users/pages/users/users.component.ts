import { SelectionModel } from "@angular/cdk/collections";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { takeUntil } from "rxjs";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { UserService } from "../../../data/services/user.service";
import { User } from "../../../data/types/user";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { UpdateUserComponent } from "../update-user/update-user.component";
import { DeleteUserComponent } from "../delete-user/delete-user.component";
import { UserComponent } from "../user/user.component";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.sass"],
})
export class UsersComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "username",
    "firstname",
    "lastname",
    "email",
    "status",
    "phonenumber",
    "actions",
    "update",
    "logs"
  ];
  users: User[] = [];
  dataSource!: MatTableDataSource<User>;
  selection = new SelectionModel<User>(true, []);
  index: number;
  id: number;
  isLoading = true;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router
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
    this.getAllUsers();
  }

  refresh() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService
      .getUsers()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.users = res;

          if(this.users){
            this.isLoading = false
          }
          
          this.dataSource = new MatTableDataSource<User>(this.users);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  editCall(user){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      user
    }
    this.dialog.open(UpdateUserComponent, dialogConfig)

    console.log(user)
  }

  detailsCall(user){
    this.dialog.open(UserComponent, {
      data: {
        user: user,
        action: 'details',
      },
      width: "35%",
    })
  }

  deleteCall(user){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      user
    }
    this.dialog.open(DeleteUserComponent, dialogConfig)

    console.log(user)
  }

  updateUser(userId){
    this.router.navigate([`admin/account/update-profile/${userId}`])
  }

   viewAccountLogs(userId) {
    this.router.navigate([`admin/users/user-logs/${userId}`]);
  }

  addNew() {
    this.router.navigate(['/admin/users/add-user'])
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
