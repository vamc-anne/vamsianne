import {Component, OnInit} from '@angular/core';

@Component({selector: 'portfolio', templateUrl: './portfolio.view.html'})

export class PortfolioComponent implements OnInit {
    public portfolio: Array < any > = [];
    ngOnInit() {
        this.portfolio = this.getPortfolioList();
    }

    private getPortfolioList() {
        return [
            {
                title: 'OCBC Bank',
                appName: 'FNA',
                redirectTo: 'https://www.ocbc.com',
                img: 'assets/imgz/ocbc.png'
            }, {
                title: 'Pearson',
                appName: 'Revel',
                redirectTo: 'https://revel.pearson.com',
                img: 'assets/imgz/revel.png'
            }, {
                title: 'Cognizant Advance Apps',
                appName: 'Proctor',
                redirectTo: 'https://revel.pearson.com',
                img: 'assets/imgz/proctor.PNG'
            }, {
                title: 'Sanofi',
                appName: 'Aventis',
                redirectTo: 'http://www.sanofi.com.sg',
                img: 'assets/imgz/sanofi.png'
            }
        ];
    }
}
