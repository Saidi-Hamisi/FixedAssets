import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { UserService } from "src/app/admin/data/services/user.service";
import { User } from "src/app/admin/data/types/user";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { UsersComponent } from "../users/users.component";

@Component({
  selector: "app-delete-user",
  templateUrl: "./delete-user.component.html",
  styleUrls: ["./delete-user.component.sass"],
})
export class DeleteUserComponent extends BaseComponent implements OnInit {
  user: User;
  userId: number;

  constructor(
    public dialogRef: MatDialogRef<UsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.user = this.data.user;

    this.userId = this.data.user.id;
  }

  confirmDelete() {
    this.userService
      .deleteUser({ username: this.user.username })
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log(res);
          this.snackbar.showNotification("snackbar-success", res.message);
          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  confirmLock() {
    this.userService
      .lockUserAccount({ username: this.user.username, status: false })
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification("snackbar-success", res.message);
          this.dialogRef.close();
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
