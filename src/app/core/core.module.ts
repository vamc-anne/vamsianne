import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterConfig, Components } from "./core.router";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";

import { ContactsService } from "./services/contacts.service";
import { PortfolioService } from "./services/portfolio.service";
import { InterceptorService } from "./services/interceptor.service";
import { LoginModule } from "../login/login.module";
//import { PortfolioResolver } from "./components/portfolio/portfolio.resolver";

@NgModule({
  declarations: [HeaderComponent, FooterComponent, ...Components],
  imports: [FormsModule, CommonModule, RouterConfig, LoginModule],
  exports: [CommonModule, HeaderComponent, FooterComponent, LoginModule],
  providers: [
    ContactsService,
    //PortfolioResolver, activate if resolver needed
    PortfolioService,
    {
      useClass: InterceptorService,
      provide: HTTP_INTERCEPTORS,
      multi: true
    }
  ]
})
export class CoreModule {}
