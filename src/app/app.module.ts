import { BrowserModule, BrowserTransferStateModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterConfig } from "./app.router";
import { HttpClientModule } from "@angular/common/http";
import { CoreModule } from "./core/core.module";
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from "./app.component";
import { UtilityModule } from "./utility/utility.module";
import { LoginModule } from "./login/login.module";
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: "vamsi-anne" }),
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    BrowserTransferStateModule,
    LoginModule,
    CoreModule,
    HttpClientModule,
    UtilityModule,
    RouterConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
