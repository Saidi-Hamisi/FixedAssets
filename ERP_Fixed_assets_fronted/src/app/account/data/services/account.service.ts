import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Log } from 'src/app/admin/data/types/log';
import { User } from 'src/app/core/models/user';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private tokenStorage: TokenStorageService, private http: HttpClient) {
   
   }

  public updatePassword(passwordDetails):Observable<{message: string}>{
    const updatePasswordUrl = `${environment.apiUrl}/otherusers/changepassword`;

    return this.http.put<{message: string}>(updatePasswordUrl, passwordDetails);
  }

  public updateProfile(profileDetails): Observable<{message: string}>{
    const updateProfileUrl = `${environment.apiUrl}/otherusers/updateprofile`;

    return this.http.put<{message: string}>(updateProfileUrl, profileDetails);
  }

  public getUser(userId):Observable<User>{
    const userUrl = `${environment.apiUrl}/otherusers/find/${userId}`;

    return this.http.get<User>(userUrl)
  }

  public getUserLogs(username){
    const accountLogsUrl = `${environment.apiUrl}/audit/alllogs/${username}`;

    return this.http.get<Log[]>(accountLogsUrl);
  }

  public getUserDailyLogs(uname, stime): Observable<Log[]> {
    const dailyAccountLogsUrl = `${environment.apiUrl}/audit/todaylogs`;

    return this.http.get<Log[]>(dailyAccountLogsUrl, {
      params: { uname, stime },
    });
  }

}
