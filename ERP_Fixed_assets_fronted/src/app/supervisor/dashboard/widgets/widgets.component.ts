import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AssetCrudService } from '../../_services/assetcrud.service';


@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent implements OnInit {

  subscription!: Subscription;
  countAssets: any;
  countProfitLoss: any;
  countPending: any;
  countActions: any;


  constructor(private router: Router, private assetsAPI:AssetCrudService) { 
    this.getAssets();
    this.getProfitLoss();
    this.getPending();
    this.getActions();
  }

  ngOnInit(): void {
    
  }

  newAsset() {
    //console.log("Div 1 Clicked");
    this.router.navigate(["/supervisor/assets/all-assets"]);
  }
  profitLoss() {
    console.log("Div 2 Clicked");
    //this.router.navigate(["/clerk/assets/add"]);
  }
  viewActions() {
    console.log("Div 3 Clicked");
  }
  pendingReq() {
    //console.log("Div 4 Clicked");
    this.router.navigate(["supervisor/pending/pending"]);
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
     this.countActions = res.length;
     //console.log("All Assets ="+JSON.stringify(res));     
    })
  }

}