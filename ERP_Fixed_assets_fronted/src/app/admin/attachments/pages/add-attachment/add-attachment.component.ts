import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { AttachmentService } from "src/app/admin/data/services/attachment.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { AttachmentsComponent } from "../attachments/attachments.component";

@Component({
  selector: "app-add-attachment",
  templateUrl: "./add-attachment.component.html",
  styleUrls: ["./add-attachment.component.sass"],
})
export class AddAttachmentComponent extends BaseComponent implements OnInit {
  file: File;
  myFiles: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<AttachmentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private attachmentService: AttachmentService,
    private snackbar: SnackbarService
  ) {
    super();
  }

  ngOnInit(): void {}

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  addAttachment() {
    const formData = new FormData();

    if (this.file) {
      formData.append("file", this.file, this.file.name);
    }

    this.attachmentService
      .addAttachment(formData)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification("snackbar-success", res.message);
          this.dialogRef.close();
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onCancel(){
    this.dialogRef.close();
  }
}
