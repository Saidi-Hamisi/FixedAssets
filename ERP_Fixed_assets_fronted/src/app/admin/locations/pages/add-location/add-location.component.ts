import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { LocationService } from "src/app/admin/data/services/location.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { LocationsComponent } from "../locations/locations.component";

@Component({
  selector: "app-add-location",
  templateUrl: "./add-location.component.html",
  styleUrls: ["./add-location.component.sass"],
})
export class AddLocationComponent extends BaseComponent implements OnInit {
  locationForm: FormGroup;
  testFoeldsValue: string = "Test";

  constructor(
    public dialogRef: MatDialogRef<LocationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private locationService: LocationService,
    private snakbar: SnackbarService
  ) {
    super();
  }

  ngOnInit(): void {
    this.locationForm = this.createLocationForm();
  }

  createLocationForm(): FormGroup {
    return this.fb.group({
      subcounty: ["", [Validators.required]],
      ward: ["", [Validators.required]],
      testField: [this.testFoeldsValue]
      //locationCode: ["", [Validators.required]],
    });
  }

  addLocation() {
    this.locationService
      .addlocation(this.locationForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snakbar.showNotification("snackbar-success", res.message)
          this.dialogRef.close();
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
