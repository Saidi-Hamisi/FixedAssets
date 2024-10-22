import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { Role } from "src/app/core/models/role";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { Subscription } from "rxjs";
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  authForm: FormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = "";
  roles: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private snackbar: SnackbarService
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  // onSubmit() {
  //   this.submitted = true;
  //   this.loading = true;
  //   this.error = "";

  //   //this.router.navigate(['/admin/dashboard'])

  //   // if(role == Role.Admin){
  //   //   this.router.navigate(['/admin/dashboard'])
  //   // }else if( role == Role.Clerk){
  //   //   this.router.navigate(['/clerk/dashboard'])
  //   // }else if( role == Role.Supervisor){
  //   //   this.router.navigate(['/supervisor/dashboard'])
  //   // }else if( role == Role.Executive){
  //   //   this.router.navigate(['/executive/dashboard'])
  //   // }else {
  //   //   this.error = "Invalid Login";
  //   // }

  //   console.log("this.authForm.value: ", this.authForm.value)

  //   if (this.authForm.invalid) {
  //     this.error = "Username and Password not valid !";
  //     return;
  //   } else {
  //     this.authService.login(this.authForm.value).subscribe(res => {
  //       this.tokenStorage.saveToken(res.tokenType);
  //       this.tokenStorage.saveToken(res.accessToken);
  //       this.tokenStorage.saveUser(res);

  //       console.log(this.tokenStorage.getToken());

  //       const role = res.roles[0];

  //       if (role == Role.Admin) {
  //         this.router.navigate(['/admin/dashboard'])
  //       } else if (role == Role.Clerk) {
  //         this.router.navigate(['/clerk/dashboard'])
  //       } else if (role == Role.Supervisor) {
  //         this.router.navigate(['/supervisor/dashboard'])
  //       } else if (role == Role.Executive) {
  //         this.router.navigate(['/executive/dashboard'])
  //       } else {
  //         this.error = "Invalid Login";
  //       }
  //       this.loading = false;

  //     }, err => {
  //       console.log(err)
  //       //this.error = "Invalid Credentials!" ;
  //      // this.error = err;
  //       this.submitted = false;
  //       this.loading = false;
  //     })
  //   }
  // }

  onSubmit() {
    // localStorage.clear();
    this.submitted = true;
    this.loading = true;
    this.error = "";
    if (this.authForm.invalid) {
      this.error = "Username or Password not valid !";
      return;
    } else {
      this.authService.login(this.authForm.value).subscribe({
        next: (res) => {
          console.log("res: ", res.body);

          this.tokenStorage.saveToken(res.tokenType);
          this.tokenStorage.saveToken(res.accessToken);
          this.tokenStorage.saveUser(res);

          console.log(this.tokenStorage.getToken());

          const role = res.roles[0];

          if (role == Role.Admin) {
            this.router.navigate(["/admin/dashboard"]);
          } else if (role == Role.Clerk) {
            this.router.navigate(["/clerk/dashboard"]);
          } else if (role == Role.Supervisor) {
            this.router.navigate(["/supervisor/dashboard"]);
          } else if (role == Role.Executive) {
            this.router.navigate(["/executive/dashboard"]);
          } else {
            this.error = "Invalid Login";
          }
          this.loading = false;
        },
        error: (err) => {
          if (err) {
            if (err.status === 401) {
              this.snackbar.showNotification(
                "snackbar-danger",
                "Authentication failed: Please check your credentials and try again."
              );
            } else {
              this.snackbar.showNotification("snackbar-danger", err.message);
            }
          }
          this.loading = false;
        },
        complete: () => { },
      }),
        Subscription;

      console.log(this.authForm.value);
    }
  }
}
