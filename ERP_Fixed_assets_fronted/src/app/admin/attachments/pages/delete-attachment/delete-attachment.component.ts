import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttachmentsComponent } from '../attachments/attachments.component';

@Component({
  selector: 'app-delete-attachment',
  templateUrl: './delete-attachment.component.html',
  styleUrls: ['./delete-attachment.component.sass']
})
export class DeleteAttachmentComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AttachmentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  confirmDelete(){}

  onNoClick(){
    this.dialogRef.close();
  }

}
