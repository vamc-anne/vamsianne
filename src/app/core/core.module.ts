import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterConfig, Components} from './core.router';

import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';

@NgModule({
    declarations: [
        HeaderComponent, FooterComponent, ...Components
    ],
    imports: [
        FormsModule, CommonModule, RouterConfig
    ],
    exports: [CommonModule, HeaderComponent, FooterComponent]
})
export class CoreModule {}
