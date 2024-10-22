import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { AssetMovementService } from "src/app/admin/data/services/asset-movement.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { AssetMovementsComponent } from "../asset-movements/asset-movements.component";

@Component({
  selector: "app-add-asset-movement",
  templateUrl: "./add-asset-movement.component.html",
  styleUrls: ["./add-asset-movement.component.sass"],
})
export class AddAssetMovementComponent extends BaseComponent implements OnInit {
  assetMovementScheduleForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AssetMovementsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private assetMovementService: AssetMovementService,
    private snackbar: SnackbarService
  ) {
    super();
  }

  ngOnInit(): void {
    this.assetMovementScheduleForm = this.createAssetMovementForm();
  }

  formControl = new FormControl("", [Validators.required]);
  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
      ? "Not a valid email"
      : "";
  }

  createAssetMovementForm(): FormGroup {
    return this.fb.group({
      scheduleItem: ["", [Validators.required]],
      land: ["", [Validators.required]],
      buildings: ["", [Validators.required]],
      computers: ["", [Validators.required]],
      furniture: ["", [Validators.required]],
      vehicles: ["", [Validators.required]],
      equipment: ["", [Validators.required]],
      currentAssets: ["", [Validators.required]],
      biologicalAssets: ["", [Validators.required]],
      total: ["", [Validators.required]],
    });
  }

  addAssetMovementSchedule() {
    this.assetMovementService
      .addAssetMovementSchedule(this.assetMovementScheduleForm.value)
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
}
