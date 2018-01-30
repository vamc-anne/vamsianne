import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    // All your other routes should come first
    {
        path: '404',
        redirectTo: 'pageNotfound'
    }, {
        path: '**',
        redirectTo: 'pageNotfound'
    }
];

export const RouterConfig = RouterModule.forRoot(routes);
