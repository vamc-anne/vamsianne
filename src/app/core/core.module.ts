import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterConfig, Components} from './core.router';

import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {PortfolioComponent} from './components/portfolio/portfolio.component';

@NgModule({
    declarations: [
        HeaderComponent, FooterComponent, PortfolioComponent, ...Components
    ],
    imports: [
        FormsModule, CommonModule, RouterConfig
    ],
    exports: [CommonModule, HeaderComponent, FooterComponent, PortfolioComponent]
})
export class CoreModule {}
