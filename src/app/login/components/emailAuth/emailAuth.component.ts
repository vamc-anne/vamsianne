import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import * as constants from "../../login.constants";
import { LoginService } from "../../login.service";

@Component({
  selector: "email-auth",
  templateUrl: "./emailAuth.view.html",
  styleUrls: ["./emailAuth.style.scss"]
})
export class EmailAuthComponent implements OnInit {
  public emailAuth: any;
  public isNewUser: boolean;
  public emailVerified: boolean;
  public errorMessage: string;
  public authService: any;
  public renderEmailVerification: boolean = false;

  @Input() config: any;
  @Output() onCancel: EventEmitter<string> = new EventEmitter<string>();
  @Output() onAuth: EventEmitter<Object> = new EventEmitter<Object>();

  public initComponent = () => {
    this.emailAuth = {
      email: "",
      firstName: "",
      lastName: "",
      password: ""
    };
    this.isNewUser = true;
    this.emailVerified = false;
    this.errorMessage = "";
    this.renderEmailVerification = false;
  };

  constructor(private loginSrvc: LoginService) {
    console.log("in cons: google auth comp");
  }

  ngOnInit() {
    this.initComponent();
    this.loginSrvc
      .init()
      .then((firebase: any) => {
        this.authService = firebase.auth();
      })
      .catch(error => {
        throw error;
      });
  }

  public cancel = this.initComponent;

  public checkIfUserExists = () => {
    this.authService &&
      this.authService
        .signInWithEmailAndPassword(this.emailAuth.email, "********")
        .catch((error: any) => {
          if (error.code === constants.WRONG_PASSWORD) {
            this.isNewUser = false;
          } else if (constants.USER_NOT_FOUND === error.code) {
            this.isNewUser = true;
          } else {
            this.handleErrors(error);
          }
        });
    this.emailVerified = true;
  };

  public signIn = () => {
    this.signInWithEmailAndPassword(
      this.emailAuth.email,
      this.emailAuth.password
    );
  };

  public signUp = () => {
    this.createUserWithEmailAndPassword(
      this.emailAuth.email,
      this.emailAuth.password
    );
  };

  public checkPasswordStrength = () => true;

  private signInWithEmailAndPassword = (email: string, password: string) => {
    this.authService &&
      this.authService
        .signInWithEmailAndPassword(this.emailAuth.email, password)
        .then(this.handleSuccess)
        .catch(this.handleErrors);
  };

  private createUserWithEmailAndPassword = (
    email: string,
    password: string
  ) => {
    this.authService &&
      this.authService
        .createUserWithEmailAndPassword(email, password)
        .then(this.handleSuccess)
        .catch(this.handleErrors);
  };

  private handleErrors = (error: any) => {
    if (error.code === constants.USER_NOT_FOUND) {
      this.errorMessage = constants.USER_NOT_FOUND_MSG;
    } else if (error.code === constants.WRONG_PASSWORD) {
      this.errorMessage = constants.WRONG_PASSWORD_MSG;
    } else if (error.code === constants.INVALID_EMAIL) {
      this.errorMessage = constants.INVALID_EMAIL_MSG;
    } else if (error.code === constants.USER_DISABLED) {
      this.errorMessage = constants.USER_DISABLED_MSG;
    }
  };

  private handleSuccess = (result: any) => {
    this.initComponent();
    this.onAuth.emit({ data: result, type: constants.EMAIL_AUTH });
  };
}
