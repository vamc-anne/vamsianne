import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { LoginService } from "../../../login/login.service";
import { NotifierService } from "../../../utility/services/notifier.service";
import { CommonUtil } from "../../../utility/services/commonUtil.service";
@Component({
  selector: "app-header",
  templateUrl: "./header.view.html",
  styleUrls: ["./header.style.scss"]
})
export class HeaderComponent implements OnInit {
  public isVisible: boolean = true;
  public isLoggedIn: boolean = false;
  public toShowNavItems: boolean = true;
  constructor(
    private loginSrvc: LoginService,
    private ref: ChangeDetectorRef,
    private notifierSrvc: NotifierService,
    private commonUtil: CommonUtil
  ) {}
  ngOnInit() {
    let self = this;
    this.loginSrvc.isLoggedIn.subscribe(status => {
      if (status !== this.isLoggedIn) {
        this.isLoggedIn = status;
      }
    });
  }
  public goTo = this.commonUtil.login;
  public logout = this.loginSrvc.logout;
}
