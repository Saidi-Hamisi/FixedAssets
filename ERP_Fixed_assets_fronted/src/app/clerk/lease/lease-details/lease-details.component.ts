import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { takeUntil, Subscription, Subject } from "rxjs";
import { LeaseService } from "../../_services/leases.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

@Component({
  selector: "app-lease-details",
  templateUrl: "./lease-details.component.html",
  styleUrls: ["./lease-details.component.sass"],
})
export class LeaseDetailsComponent implements OnInit {
  loading = true;

  leaseDetail: any;

  leaseId?: any;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route: ActivatedRoute, private leaseService: LeaseService, private snackbar: SnackbarService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      this.leaseId = params["id"];
      console.log("ID = ", this.leaseId);
    });

    this.getLeaseById();

    this.loading = false
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  data: any;
  isLoading =true;

  getLeaseById() {
    this.leaseService.getLeasseById(this.leaseId).pipe(takeUntil(this.destroy$)).subscribe(
      {
        next: (res) => {
          if (res.statusCode == 302) {
            this.data = res.entity;
            this.leaseDetail = res.entity;

            console.log("Assetdeails: ", this.data)
            this.isLoading = false;
            
            
          } else {
            this.snackbar.showNotification(
              "snackbar-danger",
              res.message
            )
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


  onClickDownloadPdf(item: any) {
    let base64String = item.documentImage;
    this.downloadPdf(base64String, item.documentTitle);
  }

  downloadPdf(base64String, documentTitle) {
    // Download PDF in Chrome etc.
    const source = `${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${documentTitle}.pdf`;
    link.click();
  }

  

}
