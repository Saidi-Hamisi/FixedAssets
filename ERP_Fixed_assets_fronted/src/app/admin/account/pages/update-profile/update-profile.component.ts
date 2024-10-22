import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { takeUntil } from "rxjs";
import { AccountService } from "src/app/account/data/services/account.service";
import { DepartmentService } from "src/app/admin/data/services/department.service";
import { RoleService } from "src/app/admin/data/services/role.service";
import { UserService } from "src/app/admin/data/services/user.service";
import { Department } from "src/app/admin/data/types/department";
import { Role } from "src/app/admin/data/types/role";
import { User } from "src/app/admin/data/types/user";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

@Component({
  selector: "app-update-profile",
  templateUrl: "./update-profile.component.html",
  styleUrls: ["./update-profile.component.sass"],
})
export class UpdateProfileComponent extends BaseComponent implements OnInit {
  hide = true;
  departments: Department[] = [];
  roles: Role[] = [];
  updateRoleForm: FormGroup;
  updateDepartmentForm: FormGroup;
  updatePasswordForm: FormGroup;
  userId: number;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private snackbar: SnackbarService,
    private departmentService: DepartmentService,
    private roleService: RoleService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService
  ) {
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(takeUntil(this.subject)).subscribe(param => {
      this.userId = param.id;
      console.log(this.userId)
    })


    this.getDepartments();
    this.getRoles();

    this.getUserById()
    
    this.updateRoleForm = this.formBuilder.group({
      userid: ["", [Validators.required]],
      roleid: ["", Validators.required],
    });

    this.updateDepartmentForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      department: ["", [Validators.required]],
    });

    this.updatePasswordForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });

  }

  getDepartments() {
    this.departmentService
      .getDepartments()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.departments = res;
          console.log(this.departments);
        },
        (err) => {
          console.log(err);
        }
      );
  }


  getRoles() {
    this.roleService
      .getAllRoles()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.roles = res;
          console.log(this.roles);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getUserById(){
    this.userService.getLoggedInUserId(this.userId).pipe(takeUntil(this.subject)).subscribe(res => {
      console.log(res)
      this.user = res;
      this.updateRoleForm.patchValue({
        userid: this.user.id,
        roleid: this.user.roles[0].id
      })

      this.updateDepartmentForm.setValue({
        username: this.user.username,
        department: this.user.department
      })

      this.updatePasswordForm.patchValue({
        username: this.user.username
      })
    }, err => {
      console.log(err)
    })
  }

  updateRole() {
    this.userService
      .updateRole(this.updateRoleForm.value)
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

  updateDepartment() {
    this.userService
      .updateDepartment(this.updateDepartmentForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification("snackbar-success", res.message);
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  updatePassword() {
    this.userService
      .updateUserPassword(this.updatePasswordForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification("snackbar-success", res.message);
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
