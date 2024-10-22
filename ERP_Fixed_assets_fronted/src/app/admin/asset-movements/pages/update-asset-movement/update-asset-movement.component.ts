import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { AssetMovementService } from "src/app/admin/data/services/asset-movement.service";
import { AssetMovement } from "src/app/admin/data/types/asset-movement";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { AssetMovementsComponent } from "../asset-movements/asset-movements.component";

@Component({
  selector: "app-update-asset-movement",
  templateUrl: "./update-asset-movement.component.html",
  styleUrls: ["./update-asset-movement.component.sass"],
})
export class UpdateAssetMovementComponent
  extends BaseComponent
  implements OnInit
{
  action: string;
  dialogTitle: string;
  assetMovement: AssetMovement;
  updateAssetMovementScheduleForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AssetMovementsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private assetMovementService: AssetMovementService
  ) {
    super();
  }

  ngOnInit(): void {
    this.updateAssetMovementScheduleForm = this.fb.group({
      id: [this.data.assetMovement.id, [Validators.required]],
      scheduleItem: [
        this.data.assetMovement.scheduleItem,
        [Validators.required],
      ],
      land: [this.data.assetMovement.land, [Validators.required]],
      buildings: [this.data.assetMovement.buildings, [Validators.required]],
      computers: [this.data.assetMovement.computers, [Validators.required]],
      furniture: [this.data.assetMovement.furniture, [Validators.required]],
      vehicles: [this.data.assetMovement.vehicles, [Validators.required]],
      equipment: [this.data.assetMovement.equipment, [Validators.required]],
      currentAssets: [
        this.data.assetMovement.currentAssets,
        [Validators.required],
      ],
      biologicalAssets: [
        this.data.assetMovement.biologicalAssets,
        [Validators.required],
      ],
      total: [this.data.assetMovement.total, [Validators.required]],
    });
  }

  updateAssetMovement() {
    console.log(this.updateAssetMovementScheduleForm.value);
    
    this.assetMovementService
      .updateAssetMovement(this.updateAssetMovementScheduleForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification("snackbar-success", res.message);
          console.log(res);
          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
