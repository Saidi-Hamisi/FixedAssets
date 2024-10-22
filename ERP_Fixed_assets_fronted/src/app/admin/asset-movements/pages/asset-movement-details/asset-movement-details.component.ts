import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetMovement } from 'src/app/admin/data/types/asset-movement';
import { AssetMovementsComponent } from '../asset-movements/asset-movements.component';

@Component({
  selector: 'app-asset-movement-details',
  templateUrl: './asset-movement-details.component.html',
  styleUrls: ['./asset-movement-details.component.sass']
})
export class AssetMovementDetailsComponent implements OnInit {
  assetMovement: AssetMovement;

  constructor( public dialogRef: MatDialogRef<AssetMovementsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.assetMovement = this.data.assetMovement;

    console.log(this.assetMovement);
  }

}
