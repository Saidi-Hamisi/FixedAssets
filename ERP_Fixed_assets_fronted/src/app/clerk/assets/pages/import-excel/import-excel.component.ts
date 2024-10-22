import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

import * as XLSX from "xlsx";
import { FileUploadService } from "src/app/clerk/_services/file-upload.service";
import { Observable } from "rxjs";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-import-excel",
  templateUrl: "./import-excel.component.html",
  styleUrls: ["./import-excel.component.sass"],
})
export class ImportExcelComponent implements OnInit {
  exceldata: [][] | undefined;

  headerRow: any;
  fileAcess: any;
  fileName: any;
  firstElement: any;
  excelSelected: any;
  // selectedFiles: any;
   // Stuff za File Upload//
   selectedFiles?: FileList;
   currentFile?: File;
   progress = 0;
   message = "";
   messageSuccess="";
   fileInfos?: Observable<any>;

  constructor(private router: Router, private location: Location, private uploadService: FileUploadService,private snackbar: SnackbarService) {}

  ngOnInit(): void {}

  newAsset() {
    //console.log("Div 1 Clicked");
    this.router.navigate(["/clerk/assets/add"]);
  }
  profitLoss() {
    //console.log("Div 2 Clicked");
    //this.router.navigate(["/clerk/assets/add"]);
  }
  viewActions() {
    //console.log("Div 3 Clicked");
  }
  pendingReq() {
    //console.log("Div 4 Clicked");
    this.router.navigate(["/clerk/assets/pending"]);
  }

  //Excel (.xml) Details Starts
  // selectFile(event: any): void {
  //   this.selectedFiles = event.target.files;
  // }
  onFileChange(evt: any) {
    const file: File = evt.target.files[0];
    this.fileAcess = file;

    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1)
      throw new Error("Multiple Files Not Supported!");

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: "binary" });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      this.exceldata = XLSX.utils.sheet_to_json(ws, { header: 1 });
      if(this.exceldata){
        this.excelSelected = true
      }

      console.log(this.exceldata);
      this.headerRow = this.exceldata[0];
      this.firstElement = this.headerRow[0];
    };
    reader.readAsBinaryString(target.files[0]);
  }

   // Codes relating to upload File start
   selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.uploadService.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.messageSuccess = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.snackbar.showNotification(
                "snackbar-danger",
                "File does not conform to format. Please check and retry!"
              );
              this.message = "File does not conform to format. Please check and retry!";
            }
            this.currentFile = undefined;
          },
        });
      }
      this.selectedFiles = undefined;
    }
  }

  onSubmit(): void {
    this.upload();
  }

  back() {
    this.location.back();
  }
}
