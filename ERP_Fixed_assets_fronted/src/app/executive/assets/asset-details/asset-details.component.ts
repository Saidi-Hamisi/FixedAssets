import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { takeUntil } from "rxjs";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { AssetService } from "../../data/services/asset.service";
import { Asset } from "../../data/types/asset";

@Component({
  selector: "app-asset-details",
  templateUrl: "./asset-details.component.html",
  styleUrls: ["./asset-details.component.sass"],
})
export class AssetDetailsComponent extends BaseComponent implements OnInit {
  assetId: number;
  asset: Asset;
  loading: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private assetService: AssetService
  ) {
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.subject))
      .subscribe((param) => {
        this.assetId = param.id;

        console.log(this.assetId);

        this.getAssetDetailsById(this.assetId);
      });
  }

  getAssetDetailsById(assetId) {
    this.assetService
      .getAssetById(assetId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.asset = res;

          if (this.asset) {
            this.loading = false;
          }

          console.log(this.asset);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
