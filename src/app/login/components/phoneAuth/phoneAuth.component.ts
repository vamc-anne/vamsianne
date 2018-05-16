import {
  Component,
  Input,
  AfterViewInit,
  EventEmitter,
  Output,
  OnInit
} from "@angular/core";
import * as constants from "../../login.constants";
import { LoginService } from "../../login.service";
import { error } from "util";

@Component({
  templateUrl: "./phoneAuth.view.html",
  selector: "login-phone",
  styleUrls: ["./phoneAuth.style.scss"]
})
export class LoginWithPhoneComponent implements OnInit {
  @Input() config: any;
  @Output() onCancel: EventEmitter<string> = new EventEmitter<string>();
  @Output() onAuth: EventEmitter<Object> = new EventEmitter<Object>();

  private phoneVerificationSrvc: any = {};
  public error: any = {};
  public info: any = {};
  public renderPhoneVerification: boolean = false;
  private authSevice: any;
  public verificationForm: any = {
    catchpaVerified: false,
    otpSent: false,
    otp: null,
    countryCode: "",
    phoneNumber: ""
  };

  get contactNo() {
    return (
      this.verificationForm.countryCode + this.verificationForm.phoneNumber
    );
  }

  constructor(private loginSrvc: LoginService) {
    console.log("in cons: phone comp");
  }

  private initRecatchpa = (firebase: any) => {
    this.phoneVerificationSrvc.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: (response: any) => {
          this.verificationForm.catchpaVerified = true;
        },
        "expired-callback": (error: any) => {
          this.error.message = error.message;
        }
      }
    );
    this.phoneVerificationSrvc.recaptchaVerifier
      .render()
      .then((widgetId: string) => {
        this.phoneVerificationSrvc.widgetId = widgetId;
      });
  };

  ngOnInit() {
    this.loginSrvc
      .init()
      .then((firebase: any) => {
        this.initRecatchpa(firebase);
        this.authSevice = firebase.auth();
      })
      .catch(error => {
        throw error;
      });
  }

  public loginWithPhone = () => {
    this.authSevice &&
      this.authSevice
        .signInWithPhoneNumber(
          this.contactNo,
          this.phoneVerificationSrvc.recaptchaVerifier
        )
        .then((confirmationResult: any) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          console.log("confirmationResult", confirmationResult);
          this.phoneVerificationSrvc.OTPVerificationSrvc = confirmationResult;
          this.verificationForm.otpSent = true;
        })
        .catch((error: any) => {
          this.error.message = error.message;
        });
  };

  public verifyOTP = () => {
    this.phoneVerificationSrvc.OTPVerificationSrvc.confirm(
      this.verificationForm.otp
    )
      .then((result: any) => {
        this.onAuth.emit({ type: constants.PHONE_AUTH, data: result });
      })
      .catch((error: any) => {
        if (error.code === constants.INVALID_CODE) {
          this.error.message = constants.INVALID_CODE_MSG;
        } else {
          this.error.message = error.message;
        }
      });
  };

  public cancel = () => {
    this.renderPhoneVerification = false;
    this.onCancel.emit("Phone");
  };
}
