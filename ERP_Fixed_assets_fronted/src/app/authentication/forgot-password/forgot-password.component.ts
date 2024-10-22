import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { AuthService } from "src/app/core/service/auth.service";
import { takeUntil } from "rxjs";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent extends BaseComponent implements OnInit {
  authForm: FormGroup;
  submitted = false;
  returnUrl: string;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackbar: SnackbarService
  ) {
    super();
  }
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      emailAddress: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.authService.forgotPassword(this.authForm.value.email).pipe(takeUntil(this.subject)).subscribe(res => {
      this.snackbar.showNotification("snackbar-success", res.message)
      console.log(res)
    }, err => {
      console.log(err)
    })

    // this.submitted = true;
    // // stop here if form is invalid
    // if (this.authForm.invalid) {
    //   return;
    // } else {
    //   this.router.navigate(["/dashboard/main"]);
    // }
  }
}
