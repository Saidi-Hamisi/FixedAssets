import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { DepartmentService } from "src/app/admin/data/services/department.service";
import { RoleService } from "src/app/admin/data/services/role.service";
import { Department } from "src/app/admin/data/types/department";
import { Role } from "src/app/admin/data/types/role";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { UserService } from "../../../data/services/user.service";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.sass"],
})
export class AddUserComponent extends BaseComponent implements OnInit {
  userForm: FormGroup;
  hide3 = true;
  agree3 = false;
  roles: any[]= [{name: "ADMIN"},{name: "EXECUTIVE"},{name: "SUPERVISOR"},{name: "CLERK"}];
  departments: Department[] = [];
     
  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private departmentService: DepartmentService,
    private userService: UserService,
    private router: Router,
    private snackbar: SnackbarService
  ) {
    super();
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      username: ["", [Validators.required]],
      phonenumber: ["", [Validators.required]],
      email: ["", [Validators.required]],
      role: ["", [Validators.required]],
      department: ["", [Validators.required]],
    });

   // this.getRoles();

    this.getDepartments();
  }

  // getRoles() {
  //   this.roleService
  //     .getAllRoles()
  //     .pipe(takeUntil(this.subject))
  //     .subscribe(
  //       (res) => {
  //         this.roles = res;
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  // }

  getDepartments() {
    this.departmentService
      .getDepartments()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.departments = res
          //console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  addUser() {
    console.log(this.userForm.valid);
    console.log(this.userForm.value);
    if(!this.userForm.valid){
      this.snackbar.showNotification('snackbar-danger', 'Please fill out the form correctly')
    }else{
      this.userService
      .addUser(this.userForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification('snackbar-success', 'User onboard successfull!')
          this.router.navigate(['/admin/users/all']);
          console.log(res);
        },
        (err) => {
          this.snackbar.showNotification('snackbar-danger', err)
          console.log(err);
        }
      );
    }
  }

  onSubmit() {
    console.log("Form Value", this.userForm.value);
  }

  onCancel(){
    this.router.navigate(['/admin/users'])
  }
}
