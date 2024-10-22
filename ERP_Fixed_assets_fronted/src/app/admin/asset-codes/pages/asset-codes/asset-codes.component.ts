import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { takeUntil } from "rxjs";
import { AssetCodeService } from "src/app/admin/data/services/asset-code.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

@Component({
  selector: "app-asset-codes",
  templateUrl: "./asset-codes.component.html",
  styleUrls: ["./asset-codes.component.sass"],
})
export class AssetCodesComponent extends BaseComponent implements OnInit {
  fields: string[] = [];
  assetCodeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private assetCodeService: AssetCodeService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAssetCodesFields();

    this.assetCodeForm = this.fb.group({
      id: ["", [Validators.required]],
      parameter: ["", [Validators.required]],
    });
  }

  getAssetCodesFields() {
    this.assetCodeService
      .getAssetCodeFileds()
      .pipe(takeUntil(this.subject))
      .subscribe((res) => {
        this.fields = res;
        console.log(this.fields);
      });
  }

  addAssetCode() {
    console.log(this.assetCodeForm.value);

    this.assetCodeService
      .addAssectCodeParam(this.assetCodeForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification("snackbar-success", res.message)
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
