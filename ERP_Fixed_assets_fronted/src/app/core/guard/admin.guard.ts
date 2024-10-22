import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { Role } from "../models/role";
import { TokenStorageService } from "../service/token-storage.service";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate, CanLoad {
  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router,
    private snackbar: SnackbarService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.tokenStorage.getUser()) {
      let userRole = this.tokenStorage.getUser().roles;
      if (userRole != Role.Admin) {
        // this.snackbar.showNotification(
        //   "snackbar-danger",
        //   "You don't have the rights to access this resource !"
        // );

        this.router.navigate(["/authentication/signin"]);
        return false;
      }

      return true;
    }
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      if (this.tokenStorage.getUser()) {
        let userRole = this.tokenStorage.getUser().roles;
        if (userRole != Role.Admin) {
          // this.snackbar.showNotification(
          //   "snackbar-danger",
          //   "You don't have the rights to access this resource !"
          // );
  
          this.router.navigate(["/authentication/signin"]);
          return false;
        }
  
        return true;
      }
    return true;
  }
}
