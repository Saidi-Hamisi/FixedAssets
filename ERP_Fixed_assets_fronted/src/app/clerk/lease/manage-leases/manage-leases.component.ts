import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, takeUntil } from "rxjs";
import {
  FilesService,
  SelectedFiles,
} from "src/app/shared/custom-components/fileconversion/files.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { LeaseService } from "../../_services/leases.service";
import { LessorsLookupComponent } from "../lookups/lessors-lookup/lessors-lookup.component";

@Component({
  selector: "app-manage-leases",
  templateUrl: "./manage-leases.component.html",
  styleUrls: ["./manage-leases.component.scss"],
})
export class ManageLeasesComponent implements OnInit, OnDestroy {
  isLinear = false;
  genForm: FormGroup;
  paymentForm: FormGroup;
  //documentsForm: FormGroup;
  //fileForm: FormGroup;

  landForm: FormGroup;
  buildingForm: FormGroup;
  plantForm: FormGroup;
  vehicleForm: FormGroup;
  softwareForm: FormGroup;

  showForm = false;
  pageFunction = "Add";
  mngForm: FormGroup;

  displayedColumnsDocumnets: string[] = [
    "id",
    "fileName",
    "selectFile",
    "removeRow",
  ];
  //dataSource!: MatTableDataSource<AssetModel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  leaseTypes: any[] = [
    { id: "1", name: "Land" },
    { id: "2", name: "Building" },
    { id: "3", name: "Plant and machinery" },
    { id: "4", name: "Motor vehicle" },
    { id: "5", name: "Software" },
    { id: "6", name: "Other" },
  ];

  busscategories: any[] = [{ name: "Cat1" }, { name: "Cat2" }];

  leaseClassifications: any[] = [
    { name: "Finance lease" },
    { name: "Operating lease" },
  ];


  paymentFrequencies: any[] = [{ name: "annually" }, { name: "semiAnnually" }, { name: "quarterly" }, { name: "monthly" }];
  businessCategories: any[] = [{ name: "Individual" }, { name: "Company" }, { name: "Cooperative" }];

  paymentTimings: any[] = [{ name: "Beginning of Term", value: "beginningofterm" }, { name: "End of Term", value: "endofterm" }];
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private fb: FormBuilder,
    private filesService: FilesService,
    private leaseService: LeaseService,
    private snackbar: SnackbarService,
    private router: Router,
    private dialog: MatDialog,
  ) { }
  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    this.getPage();

    this.getLessors();
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

  // Individual lessor, Company, cooperative

  generateEmptyForm() {

    this.genForm = this.fb.group({
      businessCategory: ["", Validators.required],
      leaseType: ["", Validators.required],
      lessorCode: ["", Validators.required],
      leaseTerm: [0, Validators.required],
      startDate: ["", Validators.required],
      paymentTiming: ["", Validators.required],
      // endDate: ["", Validators.required],

      acreage: [""],

      depreciationRate: [0],

      initialCost: [0],

      // modifiedBy: [""],
      // modifiedTime: [""],
      // postedBy: [""],
      // postedTime: [""],
      // deleteTime: [""],
      // deletedBy: [""],

      land: [""],
      software: [""],
      building: [""],
      leaseDocuments: [""],
      motorVehicle: [""],
      plantAndMachinery: [""],
      // paymentdetails
      paymentFrequency: ["", Validators.required],
      pmtFrequency: [""],
      upfrontPmt: [0, Validators.required],
      initialCosts: [0, Validators.required],
      leaseIncentive: [0, Validators.required],
      leaseClassification: ["", Validators.required],
      leaseContractNo: ["", Validators.required],
      fixedPmt: [0, Validators.required],
      variablePmts: ["", Validators.required],
      lessorAccountNo: ["", Validators.required],
      discountRate: [0, Validators.required],
      escalationFactor: [0, Validators.required],
      securityDeposit: [0, Validators.required],
      leaseLiability: [0],
      rou: [0],
    });

    this.landForm = this.fb.group({
      // Land
      acreage: [""],
      location: [""],
      coordinates: [""],
      landRegNo: [""],
      utilizationLand: [""],
      layout: [""],
      size: ["1"],
    });

    this.buildingForm = this.fb.group({
      // Building
      buildingName: [""],
      buildingAddress: [""],
      buildingLocation: [""],
      floorSpace: [""],
      utilitzation: [""],
      buidingLayout: [""],
      utilizationBuilding: [""],
    });

    this.plantForm = this.fb.group({
      // Plant & Machinery
      type: [""],
      serialNo: [""],
      modelNo: [""],
      capacity: [""],
      status: [""],
      utilizationMachinery: [""],
      useLocation: [""],
    });

    this.vehicleForm = this.fb.group({
      // Motor Vehicle
      make: [""],
      model: [""],
      yom: [""],
      vin: [""],
      color: [""],
      engineSize: [""],
      mileage: [""],
      condition: [""],
      regNo: [""],
      poi: [""],
      utilizationVehicle: [""],
      vehicleCondition: ["Good"],
    });

    this.softwareForm = this.fb.group({
      // Software
      name: [""],
      version: [""],
      vendor: [""],
      licenseType: [""],
      systemRequirements: [""],
    });

    this.createFileForm();

    this.showForm = true;

  }
  generateFormWithDate() {
  }

  // form: FormGroup;
  // fileInputs: FormArray;

  // ******************************************************************************
  //form: FormGroup;

  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  displayColumns = ["id", "documentTitle", "selectFile", "action"];
  rows: FormArray = this.fb.array([]);
  documentsForm: FormGroup = this.fb.group({ filedetails: this.rows });

  isFileDataLoading: boolean = true;

  fileForm: FormGroup;
  fileInputs: FormArray;

  createFileForm() {
    this.fileForm = this.fb.group({
      files: this.fb.array([]),
    });
    //this.fileInputs = this.fileForm.get('files') as FormArray;
    this.addFileRow();
  }

  addFileRow() {
    this.isFileDataLoading = false;
    const row = this.fb.group({
      documentImage: ["", Validators.required],
      documentTitle: ["", Validators.required],
    });
    //this.fileInputs.push(row);
    this.rows.push(row);
    this.dataSource.next(this.rows.controls);
  }

  updateView() {
    this.dataSource.next(this.rows.controls);
  }

  // deleteCall(index){
  //   this.dataSource.splice(index, 1);
  // }
  deleteCall(index: number) {
    const dataArray = this.dataSource.getValue(); // Get the underlying array
    dataArray.splice(index, 1); // Remove 1 item at the specified index
    this.dataSource.next(dataArray); // Update the BehaviorSubject with the modified array
  }

  submitForm() {
    // Handle form submission to the backend
    console.log(this.fileForm.value);
  }

  getBussCategory(event: any) { }

  public selectedFiles: SelectedFiles[] = [];
  public isFileLoading = new BehaviorSubject(false);

  currFile: string;
  currFilename: any;

  onSelectFile(files, selectedRow, index) {
    console.log("row: ", selectedRow.value, index);
    this.isFileLoading.next(true);
    this.selectedFiles = [];
    this.filesService.toBase64(files, this.selectedFiles).subscribe((res) => {
      if (res) {
        this.isFileLoading.next(false);

        this.selectedFiles = res;
        console.log("selectedFiles: ", this.selectedFiles);
        this.currFile = this.selectedFiles[0].base64;
        this.currFilename = this.selectedFiles[0].name;

        this.rows.at(index).patchValue({
          documentImage: this.currFile,
          documentTitle: this.currFilename,
        });
        this.updateView();
      }
    });
  }

  landSelected: boolean = false;
  buildSelected: boolean = false;
  plantSelected: boolean = false;
  vehSelected: boolean = false;
  softSelected: boolean = false;

  getCategory(event: any) {
    //console.log(event.value);

    if (event.value == "Land") {
      this.landSelected = true;
    } else {
      this.landSelected = false;
    }
    if (event.value == "Building") {
      this.buildSelected = true;
    } else {
      this.buildSelected = false;
    }
    if (event.value == "Plant and machinery") {
      this.plantSelected = true;
    } else {
      this.plantSelected = false;
    }
    if (event.value == "Motor vehicle") {
      this.vehSelected = true;
    } else {
      this.vehSelected = false;
    }
    if (event.value == "Software") {
      this.softSelected = true;
    } else {
      this.softSelected = false;
    }
  }

  onSubmit() {
    console.log("this.genFormBefore: ", this.genForm.value);
    this.genForm.patchValue({
      land: this.landForm.value,
      building: this.buildingForm.value,
      motorVehicle: this.vehicleForm.value,
      software: this.softwareForm.value,

      plantAndMachinery: this.plantForm.value,

      leaseDocuments: this.documentsForm.value.filedetails,
    });

    console.log("this.landForm: ", this.landForm.value);
    console.log("this.buildingForm: ", this.buildingForm.value);
    console.log("this.plantForm: ", this.plantForm.value);
    console.log("this.vehicleForm: ", this.vehicleForm.value);
    console.log("this.softwareForm: ", this.softwareForm.value);

    console.log("this.documentsForm: ", this.documentsForm.value.filedetails);

    console.log("this.genFormAfter: ", this.genForm.value);

    if (this.pageFunction == "Add") {
      this.leaseService
        .addLeasse(this.genForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(

          {
            next: (res) => {
              if (res.statusCode === 201) {
                this.snackbar.showNotification(
                  "snackbar-success",
                  "Lessor Added Successfully"
                );
              } else {
                this.snackbar.showNotification(
                  "snackbar-success",
                  res.message
                );
              }
            },
            error: (err) => {
              this.snackbar.showNotification(
                "snackbar-danger",
                "Error Adding Lessor"
              );
            },
            complete: () => {

            }
          }
          // (res) => {


          //   console.log(res);
          //   this.snackbar.showNotification(
          //     "snackbar-success",
          //     "Lessor Added Successfully"
          //   );
          // },
          // (err) => {
          //   console.log(err);
          //   this.snackbar.showNotification(
          //     "snackbar-danger",
          //     "Error Adding Lessor"
          //   );
          // }
        );

      this.router.navigate(["/clerk/leases/all-leases"]);
    } else if (this.pageFunction == "Update") {
      this.leaseService
        .updateLeasse(this.mngForm.value)
        .pipe()
        .subscribe(
          (res) => {
            console.log(res);
            this.snackbar.showNotification(
              "snackbar-success",
              "Lessor Added Successfully"
            );
          },
          (err) => {
            console.log(err);
            this.snackbar.showNotification(
              "snackbar-danger",
              "Error Adding Lessor"
            );
          }
        );

      this.router.navigate(["/clerk/leases/all-leases"]);
    }
  }



  // ****************************************************************************************************************************************************
  lessorIsSelected = false;
  selectedLessors: any[] = [];
  lessors: any;
  lessorsLookup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      action: "view lessors",
      data: this.lessors,
      selected: this.selectedLessors,
    };

    const dialogRef = this.dialog.open(LessorsLookupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.data.length != 0) {
        console.log("result: ", result.data[0]);

        this.genForm.patchValue({
          lessorCode: result.data[0].lessorCode,

        });
        //this.getSupplierById(result.data[0].id);
        this.lessorIsSelected = true;

      }
    });
  }

  getLessors() {
    this.leaseService.getLessors().subscribe(
      (response: any) => {
        //this.detail = response;

        console.log("Lessors = ", response);

        this.lessors = response.entity;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}


