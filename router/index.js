import { LANG } from "../settings/lang.js";
import { authWithOneTimeToken } from "../controllers/auth.js";
import {
  createOrUpdateArticle,
  deleteArticle,
  showArticle,
  showArticleList,
} from "../controllers/article.js";
import { processWebHook } from "../controllers/telegram.js";
import { TELEGRAM_UPDATE_METHODS } from "../settings/index.js";
import { ROUTES } from "../settings/routes.js";

export const router = (app, serverPort) => {
  // Root route.
  app.get("/", (req, res) => res.send(LANG.serverIsRunning(serverPort)))

  // Telegram webhook.
  if (process.env.TELEGRAM_UPDATE_METHOD === TELEGRAM_UPDATE_METHODS.webhook) {
    app.post(ROUTES.TELEGRAM_WEBHOOK, processWebHook);
  }

  // Authorization.
  app.post(ROUTES.AUTH_WITH_ONE_TIME_TOKEN, authWithOneTimeToken);

  // Articles.
  app.get(ROUTES.ARTICLES, showArticleList);
  app.get(`${ROUTES.ARTICLE}/:id`, showArticle);
  app.delete(`${ROUTES.ARTICLE}/:id`, deleteArticle);
  app.post(ROUTES.ARTICLE, createOrUpdateArticle);
}

