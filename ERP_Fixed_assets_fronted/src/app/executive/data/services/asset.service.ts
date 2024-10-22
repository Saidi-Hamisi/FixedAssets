import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Asset } from '../types/asset';
import { AssetCategory } from '../types/asset-category';
import { AssetDepartmentUnit } from '../types/asset-department-unit';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private http: HttpClient) { }

  getAssetsByCategories(): Observable<AssetCategory[]>{
    const assetByCategoryUrl = `${environment.BASE_URL}api/categories/assets`;

    return this.http.get<AssetCategory[]>(assetByCategoryUrl);
  }

  getAssetsByDepartmentUnits():Observable<AssetDepartmentUnit[]>{
    const assetsByDepartmentUnitUrl = `${environment.BASE_URL}api/departments/departmentunits/assets`;

    return this.http.get<AssetDepartmentUnit[]>(assetsByDepartmentUnitUrl)
  }

  filterAssetByCategory(category): Observable<Asset[]>{
    const assetUrl = `${environment.BASE_URL}api/assets/findbycatgory/${category}`;

    return this.http.get<Asset[]>(assetUrl);
  }

  getAssets(): Observable<Asset[]>{
    const allAssetsUrl = `${environment.BASE_URL}api/assets/assetList`;

    return this.http.get<Asset[]>(allAssetsUrl);
  }

  getAssetById(assetId): Observable<Asset>{
    const assetUrl = `${environment.BASE_URL}api/assets/${assetId}`;

    return this.http.get<Asset>(assetUrl);
  }
}
