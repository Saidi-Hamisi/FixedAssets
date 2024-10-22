import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { AssetCrudService } from "src/app/clerk/_services/assetcrud.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { Observable, Subscription } from "rxjs";
import { FilesUploadService } from "src/app/clerk/_services/files-upload.service";
import { HttpErrorResponse, HttpEventType, HttpResponse } from "@angular/common/http";


@Component({
  selector: 'app-edit-asset',
  templateUrl: './edit-asset.component.html',
  styleUrls: ['./edit-asset.component.sass']
})
export class EditAssetComponent implements OnInit {

  @Input() data: any;

  subscription!: Subscription;
  
  categories = [
    { name: "Furniture" },
    { name: "Land" },
    { name: "Buildings" },
    { name: "Motor Vehicles" },
    { name: "Computers" },
    { name: "Computer Accessories" },
    { name: "Equipment" },
    { name: "Current Assets" },
    { name: "Biological Assets" },
  ];

  locations: any;
  departmentUnits: any;
  custodians: any;

  depreciations = [
    { name: "Straight line method" },
    { name: "Reducing balance method" },
   
  ];

  formControl = new FormControl("", [Validators.required]);
  
  // Stuff za File Upload//
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  fileInfos?: Observable<any>;

 

  formIsValid: any;

  loading = true;

  assetDetail: any;
  assetId?: any;

  furSelected?: any;
  landSelected?: any;
  buSelected?: any;
  vehSelected?: any;
  compsSelected?: any;
  compsASelected?: any;
  equipSelected?: any;
  currSelected?: any;
  bioSelected?: any;

  docForm!: FormGroup;
  //docForm: FormGroup;
  //hide3 = true;
  //agree3 = false;
  constructor(
    private snackbar: SnackbarService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location,
    private assetCrudService: AssetCrudService,
    private uploadService: FilesUploadService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.assetId = params["id"];
      console.log("ID = " + this.assetId);
    });

    this.getAssetById();
    
  }
  
  ngOnInit(): void {

   
    
    this.fileInfos = this.uploadService.getFiles();
    this.getCustodians();
    this.getDepartments();
    this.getLocations();
    console.log("Data", this.data);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  // Get By ID starts
  getAssetById() {
    
    this.assetCrudService.getAsset(this.assetId).subscribe(
      (response) => {
        this.assetDetail = response;
        //this.stringfiedData = JSON.stringify(this.assetDetail);

        //QR Code Info
        

        console.log("details = ", this.assetDetail);
       

        if (this.assetDetail) {
          this.docForm = this.createForm();
          this.loading = false;
          this.getCategory();
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [this.assetDetail.id, [Validators.required]],
      assetCode: [this.assetDetail.assetCode, [Validators.required]],
      category: [this.assetDetail.category, [Validators.required]],
      departmentUnit: [this.assetDetail.departmentUnit, [Validators.required]],
      location: [this.assetDetail.location, [Validators.required]],
      custodian: [this.assetDetail.custodian, [Validators.required]],
      assetName: [this.assetDetail.assetName, [Validators.required]],
      cost: [this.assetDetail.cost, [Validators.required]],
      depreciationType: [this.assetDetail.depreciationType, [Validators.required]],
      acquisitionDate: [new Date(this.assetDetail.acquisitionDate), [Validators.required]],
      depreciationRate: [this.assetDetail.depreciationRate, [Validators.required]],
      description: [this.assetDetail.description],
      //Other fields
      serialNo: [this.assetDetail.serialNo],
      size: [this.assetDetail.size],
      regNo: [this.assetDetail.regNo],
      engineNo: [this.assetDetail.engineNo],
      chasisNo: [this.assetDetail.chasisNo],
      localAuthority: [this.assetDetail.localAuthority],
      type: [this.assetDetail.type],
      model: [this.assetDetail.model],
      remarks: [this.assetDetail.remarks],
      usageLifetime: [this.assetDetail.usageLifetime],
      lrno: [this.assetDetail.lrno],
      make: [this.assetDetail.make],
    });
  }
  getCategory(){
    if (this.assetDetail.category == "Furniture") {
      this.furSelected = true;
    } else {
      this.furSelected = false;
    }
    if (this.assetDetail.category == "Land") {
      this.landSelected = true;
    } else {
      this.landSelected = false;
    }
    if (this.assetDetail.category == "Buildings") {
      this.buSelected = true;
    } else {
      this.buSelected = false;
    }
    if ( this.assetDetail.category == "Motor Vehicles") {
      this.vehSelected = true;
    } else {
      this.vehSelected = false;
    }
    if ( this.assetDetail.category == "Computers") {
      this.compsSelected = true;
    } else {
      this.compsSelected = false;
    }
    if ( this.assetDetail.category == "Computer Accessories") {
      this.compsASelected = true;
    } else {
      this.compsASelected = false;
    }
    if ( this.assetDetail.category == "Equipment") {
      this.equipSelected = true;
    } else {
      this.equipSelected = false;
    }
    if ( this.assetDetail.category == "Current Assets") {
      this.currSelected = true;
    } else {
      this.currSelected = false;
    }
    if ( this.assetDetail.category == "Biological Assets") {
      this.bioSelected = true;
    } else {
      this.bioSelected = false;
    }
  }

  getCategoryById(event: any) {
    //console.log(event.value);

    if (event.value == "Furniture") {
      this.furSelected = true;
    } else {
      this.furSelected = false;
    }
    if (event.value == "Land") {
      this.landSelected = true;
    } else {
      this.landSelected = false;
    }
    if (event.value == "Buildings") {
      this.buSelected = true;
    } else {
      this.buSelected = false;
    }
    if (event.value == "Motor Vehicles") {
      this.vehSelected = true;
    } else {
      this.vehSelected = false;
    }
    if (event.value == "Computers") {
      this.compsSelected = true;
    } else {
      this.compsSelected = false;
    }
    if (event.value == "Computer Accessories") {
      this.compsASelected = true;
    } else {
      this.compsASelected = false;
    }
    if (event.value == "Equipment") {
      this.equipSelected = true;
    } else {
      this.equipSelected = false;
    }
    if (event.value == "Current Assets") {
      this.currSelected = true;
    } else {
      this.currSelected = false;
    }
    if (event.value == "Biological Assets") {
      this.bioSelected = true;
    } else {
      this.bioSelected = false;
    }
  }

  //Get error message
  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
      ? "Not a valid email"
      : "";
  }
  
  getCustodians() {
    this.subscription = this.assetCrudService.getCustodians().subscribe(res => {
     this.custodians = res;
     console.log("All custodians =", this.custodians);
    })
  }
  getDepartments() {
    this.subscription = this.assetCrudService.getDepartments().subscribe(res => {
     this.departmentUnits = res;
     console.log("All departmentUnits =", this.departmentUnits);
    })
  }
  getLocations() {
    this.subscription = this.assetCrudService.getLocations().subscribe(res => {
     this.locations = res;
     console.log("All locations =", this.locations);
    })
  }
  

  cancel() {
    this.location.back();
  }

  // Codes relating to upload File start
  selectFiles(event): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }
  uploadFiles(): void {
    this.message = [];
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }
  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    if (file) {
      this.uploadService.upload(file).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.snackbar.showNotification(
              "snackbar-success",
              "Files uploaded successfully: "
            );
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            this.fileInfos = this.uploadService.getFiles();
          }
        },
        error: (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
          this.snackbar.showNotification(
            "snackbar-danger", err +
            "!"
          );
          this.fileInfos = this.uploadService.getFiles();
        }
      });
    }
  }
 

//  Submit Form

  validate() {
    console.log("Form Value", this.docForm.value);
    //console.log("Contents of form = "+this.assetForm.value);

    // Validate Other fields
    if (!this.docForm.value.category) {
      this.snackbar.showNotification("snackbar-danger", "Please enter category!");
    }
    else if (this.docForm.value.category == "Furniture") {
      if (!this.docForm.value.serialNo) {
        this.getErrorMessage();
        this.snackbar.showNotification("snackbar-danger", "Please enter Serial number!");
        this.formIsValid = false;
      } else if (!this.docForm.value.type) {
        this.getErrorMessage();
        this.snackbar.showNotification("snackbar-danger", "Please enter type!");
        this.formIsValid = false;
      } else if (!this.docForm.value.description) {
        this.getErrorMessage();
        this.snackbar.showNotification("snackbar-danger", "Please Enter description!");
        this.formIsValid = false;
      } else{
        this.onSubmit();
      }
    } 
    else if (this.docForm.value.category == "Land") {
      if (!this.docForm.value.lrno) {
        //this.getErrorMessage();
        this.snackbar.showNotification("snackbar-danger", "Please enter LR number!");
        this.formIsValid = false;
      } else if (!this.docForm.value.size) {
        //this.getErrorMessage();
        this.snackbar.showNotification("snackbar-danger", "Please enter size!");
        this.formIsValid = false;
      }else{
        this.onSubmit();
      }
    }
    else if (this.docForm.value.category == "Buildings") {
      if (!this.docForm.value.lrno) {
        this.getErrorMessage();
        this.snackbar.showNotification("snackbar-danger", "Please enter LR number!");
        this.formIsValid = false;
      } else if (!this.docForm.value.size) {
        this.getErrorMessage();
        this.snackbar.showNotification("snackbar-danger", "Please enter size!");
        this.formIsValid = false;
      } else if (!this.docForm.value.type) {
        this.getErrorMessage();
        this.snackbar.showNotification("snackbar-danger", "Please Enter type!");
        this.formIsValid = false;
      } else{
        this.onSubmit();
      }
    } 
    else if (this.docForm.value.category == "Motor Vehicles") {
   
      if (!this.docForm.value.regNo) {
        this.getErrorMessage();
        this.snackbar.showNotification("snackbar-danger", "Please enter Registration number!");
        this.formIsValid = false;
      } else if (!this.docForm.value.engineNo) {
        this.getErrorMessage();
        this.snackbar.showNotification("snackbar-danger", "Please enter Engine Number!");
        this.formIsValid = false;
      }else if (!this.docForm.value.chasisNo) {
        this.getErrorMessage();
        this.snackbar.showNotification("snackbar-danger", "Please enter chasis number!");
        this.formIsValid = false;
      } else if (!this.docForm.value.description) {
        this.getErrorMessage();
        this.snackbar.showNotification("snackbar-danger", "Please enter description!");
        this.formIsValid = false;
      }else{
        this.onSubmit();
      }
    }
    
    else if (this.docForm.value.category == "Computers") {
      if (!this.docForm.value.serialNo) {
        this.getErrorMessage();
        this.snackbar.showNotification("snackbar-danger", "Please enter Serial number!");
        this.formIsValid = false;
      } else if (!this.docForm.value.make) {
        this.getErrorMessage();
        this.snackbar.showNotification("snackbar-danger", "Please enter make!");
        this.formIsValid = false;
      } else if (!this.docForm.value.description) {
        this.getErrorMessage();
        this.snackbar.showNotification("snackbar-danger", "Please Enter description!");
        this.formIsValid = false;
      } else{
        this.onSubmit();
      }
    } 
    else if (this.docForm.value.category == "Computer Accessories") {
      if (!this.docForm.value.model) {
        this.getErrorMessage();
        this.snackbar.showNotification("snackbar-danger", "Please enter model!");
        this.formIsValid = false;
      } else if (!this.docForm.value.serialNo) {
        this.getErrorMessage();
        this.snackbar.showNotification("snackbar-danger", "Please enter Serial number!");
        this.formIsValid = false;
      } else if (!this.docForm.value.description) {
        this.getErrorMessage();
        this.snackbar.showNotification("snackbar-danger", "Please Enter description!");
        this.formIsValid = false;
      }else{
        this.onSubmit();
      } 
    } 
    else if (this.docForm.value.category == "Equipment") {
      if (!this.docForm.value.make) {
        this.getErrorMessage();
        this.snackbar.showNotification("snackbar-danger", "Please enter make!");
        this.formIsValid = false;
      } else if (!this.docForm.value.description) {
        this.getErrorMessage();
        this.snackbar.showNotification("snackbar-danger", "Please Enter description!");
        this.formIsValid = false;
      } else{
        this.onSubmit();
      }
    } 
    else if (this.docForm.value.category == "Current Assets") {
      
    } 
    else if (this.docForm.value.category == "Biological Assets") {
      if (!this.docForm.value.lrno) {
        this.getErrorMessage();
        this.snackbar.showNotification("snackbar-danger", "Please enter LR number!");
        this.formIsValid = false;
      } else if (!this.docForm.value.type) {
        this.getErrorMessage();
        this.snackbar.showNotification("snackbar-danger", "Please enter type!");
        this.formIsValid = false;
      } else if (!this.docForm.value.description) {
        this.getErrorMessage();
        this.snackbar.showNotification("snackbar-danger", "Please Enter description!");
        this.formIsValid = false;
      } else{
        this.onSubmit();
      }
    }
    else{

      this.snackbar.showNotification("snackbar-danger", "Invalid form details!");
    
    } 
  

    
  }

  onSubmit(){
    if(this.selectedFiles){
      this.uploadFiles();
    }

    //this.upload();
    this.assetCrudService
      .updateAsset(this.docForm.value)
      .pipe()
      .subscribe(
        (res) => {
          console.log(res);
          this.snackbar.showNotification(
            "snackbar-success",
            "Asset Updated Successfully!!"
          );
          //this.docForm.reset();
          let route = '/clerk/assets/details';
          this.router.navigate([route], { queryParams: { id: this.assetId } });
          
        },
        (err) => {
          console.log(err);
          this.snackbar.showNotification(
            "snackbar-danger",
            "Update Failure...!!"
          );
        }
      );
  }

  

  import() {
    //console.log("clicked");
    this.router.navigate(["/clerk/assets/import"]);
  }
}
