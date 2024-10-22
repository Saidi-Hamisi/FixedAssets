import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Log } from '../types/log';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http: HttpClient) { }

  public getDailyLogs(username): Observable<Log[]>{
    const dailyLogsUrl = `${environment.apiUrl}/audit/alllogs/${username}`;

    return this.http.get<Log[]>(dailyLogsUrl);
  }

  public todayLogs(uname, stime): Observable<Log []>{
    const todayLogsUrl = `${environment.apiUrl}/audit/todaylogs`;

    return this.http.get<Log[]>(todayLogsUrl, {
      params: { uname, stime}
    })
  }
}
