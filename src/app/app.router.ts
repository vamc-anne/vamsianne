import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'articles',
        loadChildren: 'app/articles/articles.module#ArticlesModule'
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
