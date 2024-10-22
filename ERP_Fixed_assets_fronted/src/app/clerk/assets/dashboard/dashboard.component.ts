import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AssetCrudService } from '../../_services/assetcrud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  subscription!: Subscription;
  countAssets: any;
  countProfitLoss: any;
  countPending: any;

  constructor( private assetsAPI:AssetCrudService) { }

  ngOnInit(): void {
    this.getAssets();
    this.getProfitLoss();
    this.getPending();
    this.getActions();
  }


  getAssets() {
    this.subscription = this.assetsAPI.getAssetsList().subscribe(res => {
     this.countAssets = res.length;
     //console.log("All Assets ="+JSON.stringify(res));     
    })
  }
  getProfitLoss() {
    this.subscription = this.assetsAPI.getProfitLoss().subscribe(res => {
     this.countProfitLoss = res.length;
     //console.log("All Assets ="+JSON.stringify(res));     
    })
  }
  getPending() {
    this.subscription = this.assetsAPI.getPendingList().subscribe(res => {
     this.countPending = res.length;
     //console.log("All Assets ="+JSON.stringify(res));     
    })
  }
  getActions() {
    this.subscription = this.assetsAPI.getAssetsList().subscribe(res => {
     this.countPending = res.length;
     //console.log("All Assets ="+JSON.stringify(res));     
    })
  }

}
