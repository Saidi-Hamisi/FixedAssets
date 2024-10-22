import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetCodeService {

  constructor(private http: HttpClient) { }

  getAssetCodeFileds(): Observable<[string]>{
    const assetParamteresUrl = `${environment.BASE_URL}params`;

    return this.http.get<[string]>(assetParamteresUrl);
  }

  addAssectCodeParam(parameter):Observable<{message: string}>{
    const addAssetPaaramUrl = `${environment.BASE_URL}configuration`;

    return this.http.post<{message: string}>(addAssetPaaramUrl, parameter);
  }
}
