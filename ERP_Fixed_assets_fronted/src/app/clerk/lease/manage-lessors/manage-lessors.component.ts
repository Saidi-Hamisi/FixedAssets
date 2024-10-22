import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject, Subject, Subscription, takeUntil } from "rxjs";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import {
  FilesService,
  SelectedFiles,
} from "src/app/shared/custom-components/fileconversion/files.service";
import { LeaseService } from "../../_services/leases.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-manage-lessors",
  templateUrl: "./manage-lessors.component.html",
  styleUrls: ["./manage-lessors.component.sass"],
})
export class ManageLessorsComponent implements OnInit, OnDestroy {
  showForm = false;
  pageFunction = "Add";
  mngForm: FormGroup;
  currentUser: any;


  busscategories: any[] = [{ name: "Individual" }, { name: "Company" }, { name: "Cooperative" }];
  lessorData: any;
  public selectedFiles: SelectedFiles[] = [];
  public isFileLoading = new BehaviorSubject(false);
  currFile: string;
  currFilename: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private fb: FormBuilder,
    private filesService: FilesService,
    private tokenStorageService: TokenStorageService,
    private leaseService: LeaseService,
    private snackbar: SnackbarService,
    private router: Router
  ) {
    this.currentUser = this.tokenStorageService.getUser().username;
    // if (this.router.getCurrentNavigation().extras.queryParams.lessorData !== null) {
    //   this.lessorData = this.router.getCurrentNavigation().extras.queryParams.lessorData;
    //   this.pageFunction = this.router.getCurrentNavigation().extras.queryParams.pageFunction;
    //   this.generateFormWithDate();
    // } else {
    //   this.generateEmptyForm();
    // }
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
  ngOnInit(): void {
    this.getPage();
  }

  getPage() {
    if (this.pageFunction == "Add") {
      this.generateEmptyForm();
      this.showForm = true;
    }
    else if (this.pageFunction == "Update") {
      this.generateFormWithDate();
      this.showForm = true;
    }
  }
  generateEmptyForm() {
    this.mngForm = this.fb.group({
      id: [''],
      businessCategory: ["", [Validators.required]],
      lessorName: ["", [Validators.required]],
      lessorLocation: ["", [Validators.required]],
      phoneNo: ["", [Validators.required]],
      emailAddress: ["", [Validators.required]],
      regDocNo: ["", [Validators.required]],
      regDocImage: [""],
      lessorKraPin: [""]
    });
  }
  generateFormWithDate() {
    this.mngForm = this.fb.group({
      id: [this.lessorData.id],
      businessCategory: [this.lessorData.businessCategory, [Validators.required]],
      lessorName: [this.lessorData.lessorName, [Validators.required]],
      lessorLocation: [this.lessorData.lessorLocation, [Validators.required]],
      phoneNo: [this.lessorData.phoneNo, [Validators.required]],
      emailAddress: [this.lessorData.emailAddress, [Validators.required]],
      regDocNo: [this.lessorData.regDocNo, [Validators.required]],
      regDocImage: [this.lessorData.regDocImage],

      deletedBy: [this.lessorData.deletedBy],
      deletedFlag: [this.lessorData.deletedFlag],
      deletedTime: [this.lessorData.deletedTime],

      lessorCode: [this.lessorData.lessorCode],
      lessorKraPin: [this.lessorData.lessorKraPin],

      postedBy: [this.lessorData.postedBy],
      postedFlag: [this.lessorData.postedFlag],
      postedTime: [this.lessorData.postedTime],

      modifiedBy: [this.lessorData.modifiedBy],
      modifiedFlag: [this.lessorData.modifiedFlag],
      modifiedTime: [this.lessorData.modifiedTime],

      verifiedBy: [this.lessorData.verifiedBy],
      verifiedFlag: [this.lessorData.verifiedFlag],
      verifiedTime: [this.lessorData.verifiedTime],
    });
  }



  onSelectFile(event: any) {
    console.log("row: ", event.target.files);
    this.isFileLoading.next(true);
    this.selectedFiles = [];
    this.filesService
      .toBase64(event.target.files, this.selectedFiles)
      .subscribe((res) => {
        if (res) {
          this.isFileLoading.next(false);

          this.selectedFiles = res;
          console.log("selectedFiles: ", this.selectedFiles);
          this.currFile = this.selectedFiles[0].base64;
          // this.currFilename = this.selectedFiles[0].name;
          // this.currFiletype = this.selectedFiles[0].file.type;

          this.mngForm.patchValue({
            regDocImage: this.currFile,
          });
        }
      });
  }

  onSubmit() {
    if (this.pageFunction == "Add") {
      this.leaseService.addLessor(this.mngForm.value).pipe(takeUntil(this.destroy$)).subscribe(
        {
          next: (res) => {
            if (res.statusCode == 201) {
              this.snackbar.showNotification(
                "snackbar-success",
                res.message
              );
              this.router.navigate(["/clerk/leases/all-lessors"]);
            } else {
              this.snackbar.showNotification(
                "snackbar-danger",
                res.message
              );
            }
          },
          error: (err) => {
            this.snackbar.showNotification(
              "snackbar-danger",
              "Server Error: !!"
            );
          },
          complete: () => {

          }
        }
      ), Subscription;
    }
    else if (this.pageFunction == "Update") {
      this.leaseService.updateLessor(this.mngForm.value).pipe(takeUntil(this.destroy$)).subscribe(
        {
          next: (res) => {
            if (res.statusCode == 201) {
              this.snackbar.showNotification(
                "snackbar-success",
                res.message
              );
              this.router.navigate(["/clerk/leases/all-lessors"]);
            } else {
              this.snackbar.showNotification(
                "snackbar-danger",
                res.message
              );
            }
          },
          error: (err) => {
            this.snackbar.showNotification(
              "snackbar-danger",
              "Server Error: !!"
            );
          },
          complete: () => {

          }
        }
      ), Subscription;
    }
  }

}
