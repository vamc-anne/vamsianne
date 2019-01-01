import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
//services
import { ArticleService } from "../../services/articles.service";
import { NotifierService } from "../../../utility/services/notifier.service";
import { error } from "util";

@Component({
  selector: "articles",
  templateUrl: "./articles.view.html",
  styleUrls: ["./articles.style.scss"]
})
export class ArticlesComponent implements OnInit {
  public articles: any = [];
  public articleStacks: Array<string> = [];
  constructor(
    private articlesService: ArticleService,
    private notifierService: NotifierService,
    private router: Router
  ) {}
  ngOnInit() {
    this.articlesService
      .getAll()
      .then(articles => {
        this.articles = articles;
      })
      .catch(err => {});
  }

  public openArticle = (article: any) => {
    const decodedUri = this.decodeUri(article.title);
    this.router.navigate(["articles", article.id, decodedUri]);
  };

  private decodeUri = (uri: string) => uri.replace(/[^a-zA-Z0-9]/g, "-");
}
