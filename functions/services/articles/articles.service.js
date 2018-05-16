const expressJS = require('express');
const router = expressJS.Router();

function addArticle(articleRef, article) {
    return articleRef.add(article);
}

function addArticleContent(ref, content, id) {
    return ref.doc(id).set({
        content
    });
}

function articles(db) {
    let articles = db.collection('articles');
    let articleContent = db.collection('articlecontent');

    router.get('/', (req, resp) => {
        console.info('routeinfo: get articles/');
        let articleList = [];
        articles.get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    data = doc.data();
                    data.id = doc.id;
                    articleList.push(data);
                });
                resp.send(articleList);
            })
            .catch(err => {
                resp.send(err);
            });
    });

    router.get('/category/:stack', (req, resp) => {
        console.log('routeinfo: get articles/:stack');        
        resp.send(`${req.params['stack']} articles`);
    });

    router.post('/addArticle', (req, resp) => {
        console.log('routeinfo: post articles/addArticle');    
        let {
            content
        } = req.body;
        delete req.body.content;
        addArticle(articles, req.body).then(articleRef => {
            addArticleContent(articleContent, content, articleRef.id).then(article => {
                resp.send(article);
            }).catch(err => {
                resp.send(err);
            });
        }).catch(err => {
            resp.send(err);
        });
    });

    router.get('/content/:articleId', (req, resp) => {
        console.log('routeinfo: get articles/:stack');  
        articleContent.doc(req.params.articleId).get().then(article => {
            if (article.exists) {
                resp.send(article.data());
            } else {
                resp.status(400);
                resp.send('article not found');
            }
        }).then(error => {
            resp.send(error);
        })
    });

    router.get('/details/:articleId', (req, resp) => {
        console.log('routeinfo: get articles/:stack');  
        articles.doc(req.params.articleId).get().then(article => {
            if (article.exists) {
                resp.send(article.data());
            } else {
                resp.status(400);
                resp.send('article not found');
            }
        }).then(error => {
            resp.send(error);
        })
    });

    router.put('/like/:articleId', (req, resp) => {
        console.log('routeinfo: get articles/:stack');  
        articles.doc(req.params.articleId).set({
            
        })        // .get().then(article => {
        //     if (article.exists) {
        //         resp.send(article.data());
        //     } else {
        //         resp.status(400);
        //         resp.send('article not found');
        //     }
        // }).then(error => {
        //     resp.send(error);
        // })
    });

    return router;
}


module.exports = articles;