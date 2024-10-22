import { HttpResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ReportFamService } from "src/app/clerk/_services/reports_fams.service";
import { ReportLookupComponent } from "./dialogs/report-lookup/report-lookup.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-reports-fams",
  templateUrl: "./reports-fams.component.html",
  styleUrls: ["./reports-fams.component.sass"],
})
export class ReportsFamsComponent implements OnInit {
  constructor(private reportService: ReportFamService, public dialog: MatDialog, private snackbar: SnackbarService, private router: Router) { }

  ngOnInit(): void { }





  generateFixedAssetRegisterReport() {
    this.reportService
      .generateFixedAssetRegisterReport()
      .subscribe((response: HttpResponse<ArrayBuffer>) => {
        const blob = new Blob([response.body], {
          type: "application/octet-stream",
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "fixed-asset-register.xlsx";
        link.click();
      },
      
      (error) => {
        this.snackbar.showNotification(
          "snackbar-danger",
          "Error generating maintenance report: " + error
        );
        console.error("Error generating maintenance report:", error);

        // Handle error appropriately, e.g., show error message to the user
      }
    );

  }


  generateReportWithLookup(params: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      test: params,
    };
    this.dialog.open(ReportLookupComponent, dialogConfig);
  }



  generateLeaseSheduleReport(){
    this.router.navigate(["/clerk/leases/accounting"]);
  }



}
