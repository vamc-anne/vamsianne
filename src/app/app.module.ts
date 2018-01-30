import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterConfig} from './app.router';

import {CommonModule} from './common/common.module';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, CommonModule, RouterConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
