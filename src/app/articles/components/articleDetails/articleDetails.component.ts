import { Component, OnInit, OnDestroy, SecurityContext } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
//services
import { ArticleService } from "../../services/articles.service";
import { NotifierService } from "../../../utility/services/notifier.service";
import { error } from "util";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "articles",
  templateUrl: "./articleDetails.view.html",
  styleUrls: ["./articleDetails.scss"]
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {
  private routeParamsSub: Subscription;
  public article: Article;

  constructor(
    private articlesService: ArticleService,
    private notifierService: NotifierService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.routeParamsSub = this.currentRoute.paramMap.subscribe(params => {
      let articleId = params.get("id");
      this.articlesService.getArticle(articleId).then((article: Article) => {
        this.article = article;
        this.articlesService
          .getContent(articleId)
          .then((article: any) => {
            this.article.content = this.sanitizer.sanitize(
              SecurityContext.HTML,
              article.content
            );
          })
          .catch(err => {});
      });
    });
  }

  goToStack(stack) {
    console.log("Filter by stack", stack);
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe();
  }

  like() {
    this.article.likes++;
  }
}
