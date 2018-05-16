import { Injectable } from "@angular/core";
import { NotifierService } from "./notifier.service";
import { LoginController } from "../../core/components/login/login.controller";

@Injectable()
export class CommonUtil {
  constructor(private notifierSrvc: NotifierService) {}
  login = data => {
    this.notifierSrvc.openPopup({
      component: LoginController,
      size: "small",
      data: data
    });
  };
}
