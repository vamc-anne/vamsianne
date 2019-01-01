import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanDeactivate,
  Resolve,
  CanActivateChild,
  CanLoad,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { CommonUtil } from "../utility/services/commonUtil.service";
import { LoginService } from "../login/login.service";

@Injectable()
export class RouterGaurd implements CanActivate {
  constructor(private loginSrvc: LoginService, private router: Router, private commonUtil: CommonUtil) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.loginSrvc.isLoggedIn.subscribe(resp => {
      !resp && this.commonUtil.login({ onAuth: state.url });
    });
    return this.loginSrvc.isLoggedIn;
  }
}
