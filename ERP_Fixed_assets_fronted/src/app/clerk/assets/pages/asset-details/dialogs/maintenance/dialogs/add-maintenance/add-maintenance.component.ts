import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AssetModel } from "src/app/clerk/_model/asset";
import { AssetCrudService } from "src/app/clerk/_services/assetcrud.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { AssetDetailsComponent } from "../../../../asset-details.component";
import { MaintenanceComponent } from "../../maintenance/maintenance.component";

@Component({
  selector: 'app-add-maintenance',
  templateUrl: './add-maintenance.component.html',
  styleUrls: ['./add-maintenance.component.sass']
})
export class AddMaintenanceComponent implements OnInit {
  action: string;
  dialogTitle: string;
  employeesForm: FormGroup;
  assets: AssetModel;

  Data?: any;
  message?: any;
  Form!: FormGroup;

  categorys = [{ name: "Company" }, { name: "Individual" }];

  selectFeedback: " ";

  freequency = [
    {name: 'Annually'},
    {name: 'Monthly'},
    {name: 'Weekly'},
  ];

 

  constructor(
    private assetCrudService: AssetCrudService,
    private fb: FormBuilder, private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<MaintenanceComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.Data = data.test;
    console.log("The data = " + this.Data);
  }
  formControl = new FormControl("", [
    Validators.required,
    // Validators.email,
  ]);

  ngOnInit(): void {
    this.Form = this.createForm();
    this.dialogTitle = "Add new maintainace record";
    
  }
  onSubmit() {
    console.log("Add maintenance = ", this.Form.value);
    this.assetCrudService
      .addMaint(this.Data, this.Form.value)
      .pipe()
      .subscribe(
        (res) => {
          console.log(res);
          this.snackbar.showNotification('snackbar-success', "Maintainance Added Sucessfully")
          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
          this.snackbar.showNotification('snackbar-danger', "Maintainance upload failure!")
          this.dialogRef.close();
        }
      );
  }

  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
      ? "Not a valid email"
      : "";
  }
  createForm(): FormGroup {
    return this.fb.group({
     
      maintener: ["", Validators.required],
      email: ["", Validators.required],
      freequency: ["", Validators.required],
      maintDate: ["", Validators.required],
      note: ["", Validators.required],
      
    });
  }
  cancel() {
    this.dialogRef.close();
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
