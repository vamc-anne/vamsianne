import { Injectable, OnInit } from "@angular/core";
import { NgZone } from "@angular/core";
import * as firebase from "firebase/app";
import "firebase/auth";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class LoginService {
  private firebaseSrvc = firebase;
  public isLoggedIn = new BehaviorSubject(false);
  public userDetails = new BehaviorSubject(false);
  constructor(private _ngZone: NgZone) {}
  public init = (config?: any) => {
    const initedApps = this.firebaseSrvc.apps.length;
    return new Promise((resolve, reject) => {
      if (config && initedApps === 0) {
        this.firebaseSrvc.initializeApp(config);
        this.firebaseSrvc.auth().useDeviceLanguage();
        this.registerOnAuthHandler(config.onAuth);
        resolve(this.firebaseSrvc);
      } else if (initedApps > 0) {
        resolve(this.firebaseSrvc);
      } else {
        const err = new Error(
          "Kindly call this service with your firebase configuration"
        );
        reject(err);
      }
    });
  };

  public logout = (logoutHandler?: Function) => {
    this.firebaseSrvc
      .auth()
      .signOut()
      .then(resp => {
        logoutHandler && logoutHandler(resp);
        this.isLoggedIn.next(false);
        this.userDetails.next(false);
      });
  };

  public registerOnAuthHandler = (statusChangeHandler?: Function) => {
    this.firebaseSrvc.auth().onAuthStateChanged((user: any) => {
      if (user) {
        this._ngZone.run(() => {
          statusChangeHandler && statusChangeHandler(user);
          this.isLoggedIn.next(true);
          this.userDetails.next(user);
        });
      }
    });
  };
}
