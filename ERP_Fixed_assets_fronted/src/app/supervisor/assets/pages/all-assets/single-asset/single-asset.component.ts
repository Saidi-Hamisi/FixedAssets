import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetCrudService } from 'src/app/supervisor/_services/assetcrud.service';

@Component({
  selector: 'app-single-asset',
  templateUrl: './single-asset.component.html',
  styleUrls: ['./single-asset.component.sass']
})
export class SingleAssetComponent implements OnInit {

  assetId?: any;
  assetDetail?: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private assetCrudService: AssetCrudService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.assetId = params["id"];
      console.log("ID = " + this.assetId);
    });

    this.getAssetById();
  }

  // Get By ID starts
  getAssetById() {
    
    this.assetCrudService.getAsset(this.assetId).subscribe(
      (response) => {
        this.assetDetail = response;
        
        
        console.log("details = ", this.assetDetail);
       

        if (this.assetDetail) {
          //this.finValid = true;
          this.loading = false;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onNavigate() {
    let URL =
      "https://www.google.com/maps/place/Muthaiga+Square+-+Nairobi/@-1.2780075,36.8354127,7032m/data=!3m1!1e3!4m5!3m4!1s0x182f16eb9601573b:0xd3fd21052bcc867f!8m2!3d-1.2614312!4d36.8423486";
    window.open(URL);
    //this.router.navigate([""]);
  }

}
