import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { CustodianService } from "src/app/admin/data/services/custodian.service";
import { Custodian } from "src/app/admin/data/types/custodian";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { CustodiansComponent } from "../custodians/custodians.component";

@Component({
  selector: "app-delete-custodian",
  templateUrl: "./delete-custodian.component.html",
  styleUrls: ["./delete-custodian.component.sass"],
})
export class DeleteCustodianComponent extends BaseComponent implements OnInit {
  custodian: Custodian;
  custodianId: number;
  constructor(
    public dialogRef: MatDialogRef<CustodiansComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private custodianService: CustodianService
  ) {
    super();
  }

  ngOnInit(): void {
    this.custodian = this.data.custodian;
   
    this.custodianId = this.data.custodian.id;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.custodianService
      .deleteCustodian(this.custodianId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification('snackbar-success', res.message);
          console.log(res);
          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
