import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./components/about/about.component";
import { HomeComponent } from "./components/home/home.component";
import { PageNotFoundComponent } from "./components/pageNotFound/pageNotFound.component";
import { ContactMeComponent } from "./components/contactMe/contactMe.component";
import { PortfolioComponent } from "./components/portfolio/portfolio.component";
import { LoginController } from "./components/login/login.controller";
import { PortfolioResolver } from "./components/portfolio/portfolio.resolver";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "home"
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "contactMe",
    component: ContactMeComponent
  },
  {
    path: "portfolio",
    component: PortfolioComponent,
    // resolve: {
    //   team: PortfolioResolver
    // }
  },
  {
    path: "login",
    component: LoginController
  },
  {
    path: "pageNotfound",
    component: PageNotFoundComponent
  }
];

export const RouterConfig = RouterModule.forChild(routes);

export const Components = [
  AboutComponent,
  HomeComponent,
  PageNotFoundComponent,
  ContactMeComponent,
  PortfolioComponent,
  LoginController
];
