export const ROUTES = {
  ROOT: "/",
  FAVICON: "/favicon.ico",
  AUTH_WITH_ONE_TIME_TOKEN: '/auth-with-one-time-token',
  ARTICLES: '/articles',
  ARTICLE: '/article',
  TELEGRAM_WEBHOOK: `/telegram-web-hook/${process.env.TELEGRAM_WEBHOOK_SECRET}`
}

export const ROUTES_WITHOUT_AUTHORIZATION = [
  ROUTES.ROOT,
  ROUTES.FAVICON,
  ROUTES.AUTH_WITH_ONE_TIME_TOKEN,
  ROUTES.TELEGRAM_WEBHOOK,
  ROUTES.ARTICLES
]