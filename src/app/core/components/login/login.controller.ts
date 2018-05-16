import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "../../../login/login.service";

@Component({
  templateUrl: "./login.view.html",
  styleUrls: ["./login.style.scss"]
})
export class LoginController {
  public FBconfig = {};
  private redirectTo: string = "";
  public handlers: any = {};
  public data: any = {};
  constructor(
    private cRouter: ActivatedRoute,
    private route: Router,
    private loginSrvc: LoginService
  ) {
    // this.cRouter.paramMap.subscribe(rep => {
    //   this.redirectTo = rep.get("onAuth");
    // });

    this.loginSrvc.isLoggedIn.subscribe(status => {
      status && this.AuthHandler();
    });
  }
  public cancelHandler = (type: string) => {
    this[`render${type}`] = false;
  };

  public AuthHandler = (data?: any) => {
    if (this.data["onAuth"]) {
      this.route.navigate([this.data["onAuth"]]);
    } else {
      this.route.navigate(["/"]);
    }
    // Close popup on auth sucessful auth
    this.handlers.close && this.handlers.close();
  };

  public errorHandler = (error: any) => {
    console.log("error occured", error);
  };
  public loginAsAnonymous = () => {
    console.log("Functionality Yet to be Built!!");
  };
}
