import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { DepartmentUnitsService } from "src/app/admin/data/services/department-units.service";
import { DepartmentUnit } from "src/app/admin/data/types/department-unit";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { DepartmentUnitsComponent } from "../department-units/department-units.component";

@Component({
  selector: "app-delete-department-unit",
  templateUrl: "./delete-department-unit.component.html",
  styleUrls: ["./delete-department-unit.component.sass"],
})
export class DeleteDepartmentUnitComponent
  extends BaseComponent
  implements OnInit
{
  departmentUnit: DepartmentUnit;
  deparmentUnitId: number;

  constructor(
    public dialogRef: MatDialogRef<DepartmentUnitsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private departmentUnitService: DepartmentUnitsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.departmentUnit = this.data.departmentUnit;

    this.deparmentUnitId = this.data.departmentUnit.id;
  }

  confirmDelete() {
    this.departmentUnitService
      .deleteDepartmentunit(this.deparmentUnitId)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification("snackbar-success", res.message);
          this.dialogRef.close()
          console.log(res);
        },
        (err) => console.log(err)
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
