import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { Auth } from "../models/auth";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: "root",
})
// /auth/signin
///fams/auth/signin
export class AuthService {
  constructor(private http: HttpClient) {}

  // login(user: any): Observable<any> {
  //   return this.http.post<any>(
  //     `${environment.apiUrl}/auth/signin`,
  //     user,
  //     httpOptions
  //   );
  // }


  // login(data: any): Observable<any> {
  //   let CREATE_URL = `${environment.apiUrl}/auth/signin`;
  //   return this.http
  //     .post(CREATE_URL, data, {
  //       observe: "response",
  //       //withCredentials: true,
  //     })
  //     .pipe(
  //       map((res) => {
  //         return res || {};
  //       })
  //     );
  // }
  login(data: any): Observable<any> {
    const URL = `${environment.apiUrl}/auth/signin`;
  
    console.log("URL: ", URL);
    
    return this.http.post<any>(URL, data).pipe(
      tap(response => {
        console.log("Login Response: ", response);
      })
    );
  }
  

  forgotPassword(email): Observable<{message: string}>{
    const forgotPasswordUrl = `${environment.apiUrl}/reset/send-token/${email}`;

    return this.http.post<{message: string}>(forgotPasswordUrl, {})
  }

  resetPassword(passwordDetails):Observable<{message: string}>{
    const resetPasswordUrl = `${environment.apiUrl}/reset/change-password`;

    return this.http.post<{message: string}>(resetPasswordUrl, passwordDetails)
  }

  // logout() {
  //   // remove user from local storage to log user out
  //   localStorage.removeItem("currentUser");
  //   this.currentUserSubject.next(null);
  //   return of({ success: false });
  // }
}
