import { Component } from "@angular/core";
import { ArticleService } from "../../services/articles.service";
import { NotifierService } from "../../../utility/services/notifier.service";
import { LoginService } from "../../../login/login.service";

@Component({
  templateUrl: "./addArticle.view.html",
  styleUrls: ["./addArticle.scss"]
})
export class AddArticleComponent {
  public article: Article = {
    title: "",
    brief: "",
    stack: "",
    content: "",
    likes: 0,
    author: ''
  };
  public inBrowser: boolean = false;
  private brief: string = "";
  constructor(
    private articleSrvc: ArticleService,
    private notificationSrvc: NotifierService,
    private loginService: LoginService
  ) {
    this.inBrowser = !!window;
  }

  public stacks: Array<string> = [];

  public addArticle = () => {
    let userDetails = this.loginService.userDetails.getValue();
    let article = Object.assign({}, this.article, {
      stack: this.stacks.join(),
      brief: this.brief.substr(1, 400),
      author: userDetails["uid"]
    });
    article.title = article.title.trim();
    this.articleSrvc.addArticle(article).then(resp => {
      this.notificationSrvc.showToaster({
        message: "Articlee submited and pending with admin to publish"
      });
    });
  };

  public contentEdited = data => {
    this.article.content = data.content;
    this.brief = data.rawTxt;
  };

  public editorOptions = () => ({
    placeholderText: "Write Your Content Here!",
    charCounterCount: true
  });

  public addStack(stack) {
    if (this.stacks.indexOf(stack) === -1) {
      this.stacks.push(stack);
    }
  }

  public removeStack(ind) {
    this.stacks.splice(ind, 1);
  }
}
