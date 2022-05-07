import { authWithOneTimeToken } from "../controllers/auth.js";
import articleController from "../controllers/article.js";
import { LANG } from "../settings/lang.js";

export const router = (app, serverPort) => {
  // Root route.
  app.get("/", (req, res) => res.send(LANG.serverIsRunning(serverPort)))

  // Authorization.
  app.post('/auth-with-one-time-token', authWithOneTimeToken);

  // Articles.
  app.get('/articles', articleController.showList);
  app.get('/article/:id', articleController.showArticle);
  app.delete('/article/:id', articleController.deleteArticle);
  app.post('/article', articleController.createOrUpdateArticle);
}

