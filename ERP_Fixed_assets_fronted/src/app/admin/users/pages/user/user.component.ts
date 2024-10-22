import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { UserService } from "src/app/admin/data/services/user.service";
import { User } from "src/app/admin/data/types/user";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.sass"],
})
export class UserComponent extends BaseComponent implements OnInit {
  user: User;
  userId: number;

  constructor(
    public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private snackbar: SnackbarService
  ) {
    super();
  }

  ngOnInit(): void {
    this.user = this.data.user;
    console.log(this.user);
  }

  logoutUser() {
    this.userService
      .logoutUser({username: this.user.username})
      .pipe(takeUntil(this.subject))
      .subscribe((res) => {
        this.snackbar.showNotification("snackbar-success", res.message);
        this.dialogRef.close();
      }, err => {
        console.log(err)
      });
  }
}
