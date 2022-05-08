import { LANG } from "../settings/lang.js";
import { authWithOneTimeToken } from "../controllers/auth.js";
import {
  createOrUpdateArticle,
  deleteArticle,
  showArticle,
  showArticleList,
} from "../controllers/article.js";
import { processWebHook } from "../controllers/telegram.js";

export const router = (app, serverPort) => {
  // Root route.
  app.get("/", (req, res) => res.send(LANG.serverIsRunning(serverPort)))

  //
  //  webhook.
  app.post(`/telegram-web-hook/${process.env.TELEGRAM_WEBHOOK_SECRET}`, processWebHook);

  // Authorization.
  app.post('/auth-with-one-time-token', authWithOneTimeToken);

  // Articles.
  app.get('/articles', showArticleList);
  app.get('/article/:id', showArticle);
  app.delete('/article/:id', deleteArticle);
  app.post('/article', createOrUpdateArticle);
}

