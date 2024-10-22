import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../service/auth.service";
import { TokenStorageService } from "../service/token-storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private tokenStorage: TokenStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Always return true to allow access to all routes without authentication
    return true;

    // If you want to disable role-based access control as well:
    // return true;

    // Original logic commented out:
    // if (this.tokenStorage.getUser()) {
    //   const userRole = this.tokenStorage.getUser().roles;
    //   if (route.data.role && route.data.role.indexOf(userRole) === -1) {
    //     this.router.navigate(["/authentication/signin"]);
    //     return false;
    //   }
    //   return true;
    // }

    // this.router.navigate(["/authentication/signin"]);
    // return false;
  }
}
