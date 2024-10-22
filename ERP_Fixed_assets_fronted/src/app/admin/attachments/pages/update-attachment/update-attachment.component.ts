import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttachmentsComponent } from '../attachments/attachments.component';

@Component({
  selector: 'app-update-attachment',
  templateUrl: './update-attachment.component.html',
  styleUrls: ['./update-attachment.component.sass']
})
export class UpdateAttachmentComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AttachmentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
