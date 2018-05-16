import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { PortfolioService } from "../../services/portfolio.service";
@Injectable()
export class PortfolioResolver implements Resolve<any> {
  constructor(private PortfolioSrvc: PortfolioService) {}
  resolve() {
    return this.PortfolioSrvc.getPortfolios();
  }
}
