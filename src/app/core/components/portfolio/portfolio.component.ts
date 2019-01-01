import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PortfolioService } from "../../services/portfolio.service";

@Component({ selector: "portfolio", templateUrl: "./portfolio.view.html" })
export class PortfolioComponent implements OnInit {
  public portfolio: any;
  constructor(private portfolioSrvc: PortfolioService, private route: ActivatedRoute) {}
  ngOnInit() {
    this.portfolio = this.portfolioSrvc.getPortfolios();
  }
}
