import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Custodian } from '../types/custodian';

@Injectable({
  providedIn: 'root'
})
export class CustodianService {

  constructor(private http: HttpClient) { }

  public getCustodians():Observable<Custodian[]>{
    const custodiansUrl = `${environment.BASE_URL}/api/custodian/getCustodians`;

    return this.http.get<Custodian[]>(custodiansUrl)
  }

  public getCustodian(custodianId: number): Observable<Custodian>{
    const custodianUrl = `${environment.BASE_URL}/custodian/custodian/${custodianId}`;

    return this.http.delete<Custodian>(custodianUrl);
  }

  public addCustodian(custodian:any): Observable<{message: string}>{
    const addCustodianUrl = `${environment.BASE_URL}/api/custodian/new_custodian`;

    return this.http.post<{message: string}>(addCustodianUrl, custodian)
  }

  public editCustodian(custodian): Observable<{ message: string }>{
    const editCustodianUrl = `${environment.BASE_URL}/api/custodian/updateCustodian`;

    return this.http.put<{message: string}>(editCustodianUrl, custodian);
  }

  public deleteCustodian(custodianId: number): Observable<{message: string}>{
    const deleteCustodianurl = `${environment.BASE_URL}/api/custodian/deleteCustodian/${custodianId}`;

    return this.http.delete<{message: string}>(deleteCustodianurl);
  }
}
