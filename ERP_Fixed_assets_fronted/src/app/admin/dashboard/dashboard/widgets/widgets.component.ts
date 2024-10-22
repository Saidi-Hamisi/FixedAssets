import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { CustodianService } from "src/app/admin/data/services/custodian.service";
import { DepartmentUnitsService } from "src/app/admin/data/services/department-units.service";
import { DepartmentService } from "src/app/admin/data/services/department.service";
import { UserService } from "src/app/admin/data/services/user.service";
import { Custodian } from "src/app/admin/data/types/custodian";
import { Department } from "src/app/admin/data/types/department";
import { DepartmentUnit } from "src/app/admin/data/types/department-unit";
import { User } from "src/app/admin/data/types/user";
import { BaseComponent } from "src/app/shared/components/base/base.component";

@Component({
  selector: "app-widgets",
  templateUrl: "./widgets.component.html",
  styleUrls: ["./widgets.component.scss"],
})
export class WidgetsComponent extends BaseComponent implements OnInit {
  users: User[] = [];
  departments: Department[] = [];
  departmentUnits: DepartmentUnit[] = [];
  custodians: Custodian[] = [];

  constructor(
    private userService: UserService,
    private departmentService: DepartmentService,
    private departmentUnitService: DepartmentUnitsService,
    private custodianService: CustodianService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.activeUsers();
    this.getDepartments();
    this.getDepartmentUnits();
    this.getCustodians();
  }

  activeUsers() {
    this.userService
      .getUsers()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.users = res;
          //console.log(this.users.length);
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
          this.custodians = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  departmentUnitsRedirect() {
    this.router.navigate(["/admin/department-units"]);
  }

  navigateToDepartments() {
    this.router.navigate(["/admin/departments"]);
  }

  navigetToActiveUsers() {
    this.router.navigate(["/admin/users/all"]);
  }

  navigateToCustodians() {
    this.router.navigate(["admin/custodians"]);
  }
}
