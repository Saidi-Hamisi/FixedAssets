import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { UserService } from "src/app/admin/data/services/user.service";
import { User } from "src/app/admin/data/types/user";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { DeletedAccountsComponent } from "../deleted-accounts/deleted-accounts.component";

@Component({
  selector: "app-restore-account",
  templateUrl: "./restore-account.component.html",
  styleUrls: ["./restore-account.component.sass"],
})
export class RestoreAccountComponent extends BaseComponent implements OnInit {
  user: User;
  userId: number;

  constructor(
    public dialogRef: MatDialogRef<DeletedAccountsComponent>,
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

  confirmRestoreAccount() {
    this.userService
      .restoreDeletedAccount({ username: this.user.username })
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

  onNoClick() {
    this.dialogRef.close();
  }
}
