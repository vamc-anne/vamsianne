import {RouterModule, Routes} from '@angular/router';
import {ArticlesComponent} from './components/articles/articles.component';

const routes: Routes = [
    {
        path: 'articles',
        component: ArticlesComponent
    }, {
        path: ':stack/article/:uriDecoded',
        component: ArticlesComponent
    }
];

export const routerModule = RouterModule.forChild(routes);
export const components = [ArticlesComponent];
