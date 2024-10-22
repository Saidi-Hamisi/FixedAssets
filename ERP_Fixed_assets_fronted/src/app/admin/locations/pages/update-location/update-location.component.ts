import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { LocationService } from "src/app/admin/data/services/location.service";
import { Location } from "src/app/admin/data/types/location";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { LocationsComponent } from "../locations/locations.component";

@Component({
  selector: "app-update-location",
  templateUrl: "./update-location.component.html",
  styleUrls: ["./update-location.component.sass"],
})
export class UpdateLocationComponent extends BaseComponent implements OnInit {
  locationForm: FormGroup;
  location: Location;
  locationId: number;

  constructor(
    public dialogRef: MatDialogRef<LocationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private locationService: LocationService,
    private snackbar: SnackbarService
  ) {
    super();
  }

  ngOnInit(): void {
    this.locationForm = this.updateLocationForm();
    this.location = this.data.location;
    this.location = this.data.location.id;
  }

  updateLocationForm(): FormGroup {
    return this.fb.group({
      subcounty: [this.data.location.subcounty, [Validators.required]],
      ward: [this.data.location.ward, [Validators.required]],
      locationCode: [this.data.location.locationCode, [Validators.required]],
      id: [this.data.location.id, [Validators.required]],
    });
  }

  updateLocation() {
    this.locationService
      .updatelocation(this.locationForm.value)
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

  onClick(){
    this.dialogRef.close();
  }
}
