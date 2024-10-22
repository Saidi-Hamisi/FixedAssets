import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { DepartmentService } from "src/app/admin/data/services/department.service";
import { RoleService } from "src/app/admin/data/services/role.service";
import { UserService } from "src/app/admin/data/services/user.service";
import { Department } from "src/app/admin/data/types/department";
import { Role } from "src/app/admin/data/types/role";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { UsersComponent } from "../users/users.component";

@Component({
  selector: "app-update-user",
  templateUrl: "./update-user.component.html",
  styleUrls: ["./update-user.component.sass"],
})
export class UpdateUserComponent extends BaseComponent implements OnInit {
  userForm: FormGroup;
  roles: Role[] = [];
  departments: Department[] = [];

  constructor(
    public dialogRef: MatDialogRef<UsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private roleService: RoleService,
    private departmentService: DepartmentService,
    private userService: UserService,
    private snackbar: SnackbarService,
    private router: Router
  ) {
    super();

    this.userForm = this.updateUserForm();
  }

  ngOnInit(): void {
    this.getRoles();

    this.getDepartments();

    console.log(this.data.user.roles[0].name);
  }

  updateUserForm(): FormGroup {
    return this.fb.group({
      firstname: [this.data.user.firstname, [Validators.required]],
      lastname: [this.data.user.lastname, [Validators.required]],
      username: [this.data.user.username, [Validators.required]],
      phonenumber: [this.data.user.phonenumber, [Validators.required]],
      email: [this.data.user.email, [Validators.required]],
      role: [this.data.user.roles[0].name, [Validators.required]],
      department: [this.data.user.department, [Validators.required]],
      id: [this.data.user.id, [Validators.required]],
    });
  }

  getRoles() {
    this.roleService
      .getAllRoles()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.roles = res;
          console.log(res);
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
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  updateUser() {
    this.userService
      .updateUser(this.userForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification('snackbar-success', res.message);
          this.dialogRef.close();
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
