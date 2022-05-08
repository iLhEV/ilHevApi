import { authWithOneTimeToken } from "../controllers/auth.js";
import {
  createOrUpdateArticle,
  deleteArticle,
  showArticle,
  showArticleList,
} from "../controllers/article.js";
import { LANG } from "../settings/lang.js";

export const router = (app, serverPort) => {
  // Root route.
  app.get("/", (req, res) => res.send(LANG.serverIsRunning(serverPort)))

  // Authorization.
  app.post('/auth-with-one-time-token', authWithOneTimeToken);

  // Articles.
  app.get('/articles', showArticleList);
  app.get('/article/:id', showArticle);
  app.delete('/article/:id', deleteArticle);
  app.post('/article', createOrUpdateArticle);
}

