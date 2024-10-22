import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenStorageService } from "../service/token-storage.service";



@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private tokenStorage: TokenStorageService, private tokenStorageService: TokenStorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let token = this.tokenStorage.getToken();
    let currentUser = this.tokenStorageService.getUser().username;
    if (token) {
      const cloneReq = request.clone({
        headers: request.headers
          .set('Authorization', `Bearer ${token}`)
          .set('Username', currentUser) // Add the Username header
      });

      return next.handle(cloneReq);
    }

    return next.handle(request.clone());
  }
}

// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from "@angular/common/http";
// import { Observable } from "rxjs";




// export class JwtInterceptor implements HttpInterceptor {
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     console.log(request);
//    let currentUser = JSON.parse(localStorage.getItem('auth-user'));
//   if (currentUser) {
//     const accessToken = currentUser.token
//       const headers = new HttpHeaders({
//           Authorization: `${'Bearer '+accessToken}`,
//           userName: `${currentUser.username}`,
//           entityId: `${currentUser.entityId}`,
//           accessToken: accessToken

//           // 'WEB-API-key': environment.webApiKey,
//           // 'Content-Type': 'application/json',
//           // 'Access-Control-Allow-Origin':'*'
//         });
//         const cloneReq = request.clone({headers});
//         return next.handle(cloneReq);
//   }
//   return next.handle(request);
//   }
// }
