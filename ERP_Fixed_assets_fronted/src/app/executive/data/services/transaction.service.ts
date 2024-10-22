import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transaction } from '../types/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  public getDailyLogs(username): Observable<Transaction[]>{
    const dailyLogsUrl = `${environment.apiUrl}/audit/alllogs/${username}`;

    return this.http.get<Transaction[]>(dailyLogsUrl);
  }

}
