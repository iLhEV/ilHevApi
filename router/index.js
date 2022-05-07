import passphraseController from "../controllers/passphrase.js";
import articleController from "../controllers/article.js";
import {LANG} from "../settings/lang.js";

export const router = (app, serverPort) => {
  app.get("/", function (req, res) {
    res.send(LANG.serverIsRunning(serverPort))
  })
  app.get('/checkPassphrase/:phrase', passphraseController.checkPassphrase);
  app.get('/articles', articleController.showList);
  app.get('/article/:id', articleController.showArticle);
  app.delete('/article/:id', articleController.deleteArticle);
  app.post('/article', articleController.createOrUpdateArticle);

}

