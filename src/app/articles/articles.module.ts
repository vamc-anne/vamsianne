import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

//components
import { components, routerModule } from "./articles.router";
import { EditorComponent } from "./components/editor/editor.component";
import { TaggerComponent } from "./components/tagger/tagger.component";

//services'
import { ArticleService } from "./services/articles.service";
import { RouterGaurd } from "./articles.gaurd";

@NgModule({
  declarations: [...components, EditorComponent, TaggerComponent],
  imports: [FormsModule, CommonModule, routerModule],
  providers: [ArticleService, RouterGaurd],
  exports: [...components]
})
export class ArticlesModule {}
