import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { G_AUTH } from "../../login.constants";
import { LoginService } from "../../login.service";

@Component({
  template: `<button class="googleauth" (click)='loginWithGoogle()'><b class="fa fa-google">G</b>&nbsp;&nbsp;Login with Google</button>`,
  selector: "google-auth",
  styleUrls: ["./googleAuth.style.scss"]
})
export class GoogleAuthComponent implements OnInit {
  private gAuthprovider: any;
  private authService: any;
  @Input() config: any;
  @Output() onAuth: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() onError: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(private loginSrvc: LoginService) {
    console.log("in cons: google auth comp");
  }

  ngOnInit() {
    this.loginSrvc
      .init()
      .then((firebase: any) => {
        this.authService = firebase.auth();
        this.gAuthprovider = new firebase.auth.GoogleAuthProvider();
      })
      .catch(error => {
        throw error;
      });
  }

  public loginWithGoogle = () => {
    this.authService &&
      this.authService
        .signInWithPopup(this.gAuthprovider)
        .then((result: any) => {
          this.onAuth.emit({ type: G_AUTH, data: result });
        })
        .catch((error: any) => {
          this.onError.emit(error);
        });
  };
}
