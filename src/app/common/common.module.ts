import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterConfig, Components} from './common.router';

import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';

@NgModule({
    declarations: [
        HeaderComponent, FooterComponent, ...Components
    ],
    imports: [RouterConfig, FormsModule],
    exports: [HeaderComponent, FooterComponent]
})
export class CommonModule {}
