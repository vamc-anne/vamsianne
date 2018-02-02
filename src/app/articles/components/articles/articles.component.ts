import {Component, OnInit} from '@angular/core';

@Component({selector: 'articles', templateUrl: './articles.view.html'})

export class ArticlesComponent implements OnInit {
    public articles: any = [];
    public articleStacks: Array<string> = [];
    ngOnInit() {
        this.articles = this.getArticles();
        this.articleStacks = Object.keys(this.articles);
    }
    // later integrate with API
    private getArticles = () => ({
        tech: [
            {
                title: 'We can finally stop coding dialog box/modal window!',
                articleId: 'ATECH1',
                brief: `<dialog> is a html element for a popup box in a web page, including a modal option which will
                    make the rest of the page inert during use. This could be useful to block a user's interaction until
                    they give you a response, or to confirm an action. See the HTML spec.`,
                referencePage: 'https://github.com/GoogleChrome/dialog-polyfill'
            }, {
                title: 'Im not a robot!',
                articleId: 'ATECH2',
                brief: `The new reCAPTCHA is here. A significant number of your users can now attest they are human without
                    having to solve a CAPTCHA. Instead with just a single click they’ll confirm they are not a robot. We’re
                    calling it the No CAPTCHA reCAPTCHA experience. See blog for more details`,
                referencePage: 'https://developers.google.com/recaptcha/docs/display'
            }, {
                title: 'Serverless will be the new black',
                articleId: 'ATECH3',
                brief: `Serverless is a new paradigm of computing that abstracts away the complexity associated with managing
                    servers for mobile and API backends, ETL, data processing jobs, databases, and more.`,
                referencePage: 'https://cloud.google.com/serverless/'
            }
        ],
        miscellenous: [
            {
                title: 'How do we motivate ourselves everyday?',
                articleId: 'ATECH1',
                brief: `Self-motivation is far from being a simple topic; there are many books, web-pages and articles that attempt
                    to explain self-motivation. Here is a simple story that could help finding self motivation`,
                // tslint:disable-next-line:max-line-length
                referencePage: 'https://www.quora.com/How-do-I-get-motivated-every-single-day/answer/Shubhi-Khandelwal-6?share=51ee2a7e&srid=v8Pu'
            }
        ]
    })
}
