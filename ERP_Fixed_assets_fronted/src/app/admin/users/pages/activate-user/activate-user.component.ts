import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { UserService } from "src/app/admin/data/services/user.service";
import { User } from "src/app/admin/data/types/user";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { InactiveAccountsComponent } from "../inactive-accounts/inactive-accounts.component";

@Component({
  selector: "app-activate-user",
  templateUrl: "./activate-user.component.html",
  styleUrls: ["./activate-user.component.sass"],
})
export class ActivateUserComponent extends BaseComponent implements OnInit {
  user: User;
  userId: number;

  constructor(
    public dialogRef: MatDialogRef<InactiveAccountsComponent>,
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

  confirmActivateAccount() {
    this.userService
      .activateUserAccount({ username: this.user.username, status: true })
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification("snackbar-success", res.message);
          this.dialogRef.close();
         // console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
