import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { AssetModel } from "../_model/asset";
@Injectable()
export class AssetsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = "http://3.13.214.62:1905/fixedassets/api/assets/assetList";
  isTblLoading = true;
  dataChange: BehaviorSubject<AssetModel[]> = new BehaviorSubject<AssetModel[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): AssetModel[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllEmployeess(): void {
    this.subs.sink = this.httpClient.get<AssetModel[]>(this.API_URL).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }
  addEmployees(employees: AssetModel): void {
    this.dialogData = employees;

    /*  this.httpClient.post(this.API_URL, employees).subscribe(data => {
      this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }
  updateEmployees(employees: AssetModel): void {
    this.dialogData = employees;

    /* this.httpClient.put(this.API_URL + employees.id, employees).subscribe(data => {
      this.dialogData = employees;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }
  deleteEmployees(id: number): void {
    console.log(id);

    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }
}
