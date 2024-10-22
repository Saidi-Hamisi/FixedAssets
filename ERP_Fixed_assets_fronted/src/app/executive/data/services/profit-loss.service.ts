import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProfitLoss } from '../types/profit-loss';

@Injectable({
  providedIn: 'root'
})
export class ProfitLossService {

  constructor(private http: HttpClient) { }

  profitOrLossOnDisposal(): Observable<ProfitLoss[]>{
    const profitOrLossOnDisposalUrl = `${environment.BASE_URL}api/assets/disposal/records`;

    return this.http.get<ProfitLoss[]>(profitOrLossOnDisposalUrl)
  }
}
