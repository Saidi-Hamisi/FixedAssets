import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AssetCategory } from "../types/asset-category";
import { AssetDepartmentUnit } from "../types/asset-department-unit";
import { AssetLocation } from "../types/asset-location";

@Injectable({
  providedIn: "root",
})
export class AnalyticsService {
  constructor(private http: HttpClient) {}

  numberOfAssetsByCategories() {}

  assetDistributionByLocation(): Observable<AssetLocation[]> {
    const assetdistributionByLocationUrl = `${environment.BASE_URL}api/location/subcounty/assets`;

    return this.http.get<AssetLocation[]>(assetdistributionByLocationUrl);
  }

  assetValueByCategory(): Observable<AssetCategory[]> {
    const assetValueByCategoryUrl = `${environment.BASE_URL}api/categories/assets`;

    return this.http.get<AssetCategory[]>(assetValueByCategoryUrl);
  }

  numberOfAssetsByDepartmentUnit(): Observable<AssetDepartmentUnit[]> {
    const assetDepartmentUnitUrl = `${environment.BASE_URL}api/departments/departmentunits/assets`;

    return this.http.get<AssetDepartmentUnit[]>(assetDepartmentUnitUrl);
  }
}
