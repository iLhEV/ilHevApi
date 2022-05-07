import passphraseController from "../controllers/passphrase.js";
import articleController from "../controllers/article.js";

export const router = (app) => {
  app.get("/", function (req, res) {
    res.send(`<h1>App is started on port ${serverPort}...</h1>`)
  })
  app.get('/checkPassphrase/:phrase', passphraseController.checkPassphrase);
  app.get('/articles', articleController.showList);
  app.get('/article/:id', articleController.showArticle);
  app.delete('/article/:id', articleController.deleteArticle);
  app.post('/article', articleController.createOrUpdateArticle);

}

