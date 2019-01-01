import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BASE_URL } from "../articles.config";
import "rxjs/add/operator/toPromise";

@Injectable()
export class ArticleService {
  private baseUri: string = `${BASE_URL}/articles`;
  constructor(private http: HttpClient) {}
  public getAll(articleId: string = "") {
    return this.http.get(this.baseUri).toPromise();
  }
  public getArticle(articleId: any) {
    return this.http.get(`${this.baseUri}/details/${articleId}`).toPromise();
  }
  public getByStack(stack: string) {
    return this.http.get(`${this.baseUri}/category/${stack}`).toPromise();
  }
  public getContent(articleId: any) {
    return this.http.get(`${this.baseUri}/content/${articleId}`).toPromise();
  }
  public addArticle(article: Article) {
    return this.http.post(`${this.baseUri}/addArticle`, article).toPromise();
  }
}
