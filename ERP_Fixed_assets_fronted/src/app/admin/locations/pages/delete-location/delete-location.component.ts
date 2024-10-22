import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { LocationService } from "src/app/admin/data/services/location.service";
import { Location } from "src/app/admin/data/types/location";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { LocationsComponent } from "../locations/locations.component";

@Component({
  selector: "app-delete-location",
  templateUrl: "./delete-location.component.html",
  styleUrls: ["./delete-location.component.sass"],
})
export class DeleteLocationComponent extends BaseComponent implements OnInit {
  location: Location;
  locationId?: number;

  constructor(
    public dialogRef: MatDialogRef<LocationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private locationService: LocationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.location = this.data.location;
    console.log(this.location);
    this.locationId = this.data.location.id;
  }

  confirmDelete() {
    this.locationService
      .deleteLocation(this.locationId)
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
