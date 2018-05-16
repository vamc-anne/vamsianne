import { RouterModule, Routes } from "@angular/router";
import { ArticlesComponent } from "./components/articles/articles.component";
import { ArticleDetailsComponent } from "./components/articleDetails/articleDetails.component";
import { AddArticleComponent } from "./components/addArticle/addArticle.component";
import { RouterGaurd } from "./articles.gaurd";

const routes: Routes = [
  {
    path: "",
    component: ArticlesComponent
  },
  {
    path: ":id/:uridecoded",
    component: ArticleDetailsComponent
  },
  {
    path: "addarticle",
    component: AddArticleComponent,
    canActivate: [RouterGaurd]
  }
];

export const routerModule = RouterModule.forChild(routes);
export const components = [
  ArticlesComponent,
  ArticleDetailsComponent,
  AddArticleComponent
];
