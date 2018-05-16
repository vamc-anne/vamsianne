import { Injectable, PLATFORM_ID, Inject, APP_ID } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BASE_URL } from "../core.config";
import { makeStateKey, TransferState } from "@angular/platform-browser";
import "rxjs/add/operator/toPromise";
import { Observable } from "rxjs/Rx";
import { isPlatformServer } from "@angular/common";

@Injectable()
export class PortfolioService {
  constructor(
    private http: HttpClient,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string
  ) {}
  public getPortfolios() {
    const COUNTER_KEY = makeStateKey<string>("portfolioHash");
    const isServer = isPlatformServer(this.platformId);
    console.log(
      "@@@@@@@@@@@@@@@@@@@@@@@isPlatformServer(this.platformId)@@@@@@@@@@@@@@@@@@@@@@@@",
      isServer
    );
    console.log("platformId::::", JSON.stringify(this.platformId));
    console.log("appId::::", this.appId);
    const found = this.transferState.hasKey(COUNTER_KEY);
    console.log("#########found#########", found);

    if (found) {
      const res = Observable.of(
        JSON.parse(this.transferState.get<any>(COUNTER_KEY, null))
      );
      this.transferState.remove(COUNTER_KEY);
      console.log("gets from server cache?:::", res);
      return res;
    } else {
      return this.http.get(`${BASE_URL}/core/portfolio`).do(resp => {
        isServer && this.transferState.set(COUNTER_KEY, JSON.stringify(resp));
        console.log(
          "server cache set::::",
          this.transferState.get<any>(COUNTER_KEY, null)
        );
      });
    }
  }
}
