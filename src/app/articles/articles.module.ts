import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {components, routerModule} from './articles.router';

@NgModule({
    declarations: [...components],
    imports: [
        CommonModule, routerModule
    ],
    exports: [...components]
})

export class ArticlesModule {}
