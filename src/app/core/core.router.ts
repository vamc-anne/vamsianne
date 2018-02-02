import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from './components/about/about.component';
import {HomeComponent} from './components/home/home.component';
import {PageNotFoundComponent} from './components/pageNotFound/pageNotFound.component';
import {ContactMeComponent} from './components/contactMe/contactMe.component';
import {PortfolioComponent} from './components/portfolio/portfolio.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    }, {
        path: 'about',
        component: AboutComponent
    }, {
        path: 'pageNotFound',
        component: PageNotFoundComponent
    },
    {
        path: 'contactMe',
        component: ContactMeComponent
    },
    {
        path: 'portfolio',
        component: PortfolioComponent
    }
];

export const RouterConfig = RouterModule.forChild(routes);

export const Components = [AboutComponent, HomeComponent, PageNotFoundComponent, ContactMeComponent, PortfolioComponent];
