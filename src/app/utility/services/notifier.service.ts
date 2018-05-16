import { Injectable, Component } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class NotifierService {
  private loaderObservable = new BehaviorSubject(false);
  private toasterObservable = new BehaviorSubject({ show: false });
  private popUp = new BehaviorSubject(null);


  public showLoader = () => {
    return this.loaderObservable.next(true);
  };

  public hideLoader = () => {
    return this.loaderObservable.next(false);
  };

  public isLoading = () => {
    return this.loaderObservable;
  };

  public showToaster = (config: any) => {
    config && (config.show = true);
    return this.toasterObservable.next(config);
  };

  public toasterSrvc = () => {
    return this.toasterObservable;
  };

  public openPopup(config) {
    return this.popUp.next(config);
  }

  public popUpSrvc = () => {
    return this.popUp;
  };
}
