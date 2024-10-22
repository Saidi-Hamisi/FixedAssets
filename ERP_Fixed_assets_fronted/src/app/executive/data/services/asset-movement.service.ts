import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AssetMovement } from '../types/asset-movement';

@Injectable({
  providedIn: 'root'
})
export class AssetMovementService {

  constructor(private http: HttpClient) { }

  getAssetMovements(): Observable<AssetMovement[]>{
    const assetMovementsUrl = `${environment.BASE_URL}api/asset/assetmovement/fetch`;

    return this.http.get<AssetMovement[]>(assetMovementsUrl);
  }
}
