import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AssetMovement } from "src/app/admin/data/types/asset-movement";
import { AssetMovementService } from "src/app/admin/data/services/asset-movement.service";
import { AssetMovementsComponent } from "../asset-movements/asset-movements.component";
import { takeUntil } from "rxjs";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

@Component({
  selector: "app-delete-asset-movement",
  templateUrl: "./delete-asset-movement.component.html",
  styleUrls: ["./delete-asset-movement.component.sass"],
})
export class DeleteAssetMovementComponent
  extends BaseComponent
  implements OnInit
{
  assetMovement: AssetMovement;
  assetMovementId: number;

  constructor(
    public dialogRef: MatDialogRef<AssetMovementsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private assetMovementService: AssetMovementService,
    private snackbar: SnackbarService
  ) {
    super();
  }

  ngOnInit(): void {
    this.assetMovement = this.data.assetMovement;

    console.log(this.assetMovement);

    this.assetMovementId = this.data.assetMovement.id;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete() {
    this.assetMovementService
      .deleteAssetMovementUrl(this.assetMovementId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification("snackbar-success", res.message);
          this.dialogRef.close()
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
