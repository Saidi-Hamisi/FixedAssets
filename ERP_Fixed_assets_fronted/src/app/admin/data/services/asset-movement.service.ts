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

  addAssetMovementSchedule(assetMovementSchedule): Observable<{message: string}>{
    const addAssetMovementUrl = `${environment.BASE_URL}api/asset/assetmovement/add`;

    return this.http.post<{message: string}>(addAssetMovementUrl, assetMovementSchedule)
  }

  getAssetMovements(): Observable<AssetMovement[]>{
    const assetMovementsUrl = `${environment.BASE_URL}api/asset/assetmovement/fetch`;

    return this.http.get<AssetMovement[]>(assetMovementsUrl);
  }

  updateAssetMovement(assetMovementSchedule): Observable<{message: string}>{
    const updateAssetMovementUrl = `${environment.BASE_URL}api/asset/assetmovement/update`;

    return this.http.put<{message: string}>(updateAssetMovementUrl, assetMovementSchedule);
  }

  deleteAssetMovementUrl(assetMovementScheduleId): Observable<{message: string}>{
    const deleteAssetMovementScheduleUrl = `${environment.BASE_URL}api/asset/assetmovement/delete/${assetMovementScheduleId}`;

    return this.http.delete<{message: string}>(deleteAssetMovementScheduleUrl);
  }
}
