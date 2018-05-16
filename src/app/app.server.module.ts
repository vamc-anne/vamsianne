import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {
  ServerModule,
  ServerTransferStateModule
} from "@angular/platform-server";
import { ModuleMapLoaderModule } from "@nguniversal/module-map-ngfactory-loader";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppModule } from "./app.module";
import { AppComponent } from "./app.component";

@NgModule({
  imports: [
    BrowserModule.withServerTransition({
      appId: "vamsi-anne"
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    ServerModule,
    AppModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule
  ],
  providers: [
    // Add universal-only providers here
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
