import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Custodian } from 'src/app/admin/data/types/custodian';

@Component({
  selector: 'app-custodian',
  templateUrl: './custodian.component.html',
  styleUrls: ['./custodian.component.sass']
})
export class CustodianComponent implements OnInit {
  custodian: Custodian;
  custodianId: number;

  constructor( public dialogRef: MatDialogRef<CustodianComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.custodian = this.data.custodian;

    console.log(this.custodian)
  }

}
