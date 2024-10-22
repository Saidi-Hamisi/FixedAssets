import { Component, OnInit } from "@angular/core";
import { takeUntil } from "rxjs";
import { CustodianService } from "src/app/admin/data/services/custodian.service";
import { DepartmentUnitsService } from "src/app/admin/data/services/department-units.service";
import { DepartmentService } from "src/app/admin/data/services/department.service";
import { LocationService } from "src/app/admin/data/services/location.service";
import { UserService } from "src/app/admin/data/services/user.service";
import { Custodian } from "src/app/admin/data/types/custodian";
import { Department } from "src/app/admin/data/types/department";
import { DepartmentUnit } from "src/app/admin/data/types/department-unit";
import { Location } from "src/app/admin/data/types/location";
import { User } from "src/app/admin/data/types/user";
import { BaseComponent } from "src/app/shared/components/base/base.component";

@Component({
  selector: "app-widgets",
  templateUrl: "./widgets.component.html",
  styleUrls: ["./widgets.component.scss"],
})
export class WidgetsComponent extends BaseComponent implements OnInit {
  locations: Location[] = [];
  departments: Department[] = [];
  departmentUnits: DepartmentUnit[] = [];
  custodians: Custodian[] = [];
  activeAccounts: User[] = [];
  deletedAccounts: User[] = [];
  lockedAccounts: User[] = [];
  inactivaAccounts: User[] = [];

  constructor(
    private custodianService: CustodianService,
    private locationService: LocationService,
    private departmentService: DepartmentService,
    private departmentUnitService: DepartmentUnitsService,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getLocations();
    this.getDepartments();
    this.getDepartmentUnits();
    this.getCustodians();
    // this.getActiveAccounts();
    // this.getDeletedAccounts();
    // this.getLockedAccounts();
    // this.getInactiveAccounts();
  }

  getLocations() {
    this.locationService
      .getLocations()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          //console.log(res);
          this.locations = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getDepartments() {
    this.departmentService
      .getDepartments()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          //console.log(res);
          this.departments = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getDepartmentUnits() {
    this.departmentUnitService
      .getDepartmentUnits()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          //console.log(res);
          this.departmentUnits = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getCustodians() {
    this.custodianService
      .getCustodians()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          //console.log(res);
          this.custodians = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getActiveAccounts() {
    this.userService
      .getUsers()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          //console.log(res);
          this.activeAccounts = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getDeletedAccounts() {
    this.userService
      .getDeletedAccounts()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.deletedAccounts = res;
          //console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getLockedAccounts() {
    this.userService
      .getLockedAccounts()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.lockedAccounts = res;
          //console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getInactiveAccounts() {
    this.userService
      .getInactiveAccounts()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.inactivaAccounts = res;
         // console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
