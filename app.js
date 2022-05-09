import 'dotenv/config'
import express from 'express';

import {TelegramProcessing} from "./classes/TelegramProcessing.js";
import {router} from "./router/index.js";
import {TELEGRAM_UPDATE_INTERVAL, TELEGRAM_UPDATE_METHODS} from "./settings/index.js";
import {LANG} from "./settings/lang.js";

const app = express();

// Express configuration.
app.use(express.static("public")); // Use the express-static middleware.
app.use(express.json());       // To support JSON-encoded bodies.
app.use(express.urlencoded()); // To support URL-encoded bodies.


app.use(function (req, response, next) {
  // Because Chrome doesn't support CORS for connections from localhost we need this for local development.
  // TODO Check that in heroku config it's false.
  if (process.env.ALLOW_ORIGIN_ALL === 'true') {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  }
  // TODO Send 403? status when token is not presented or incorrect
  if (false) {
    const authToken = req.headers['authorization'];
    response.status(403).json({error: 'resource_forbidden'});
  }
  return next();
});




// Run node.js web server.
const serverPort = process.env.PORT || 3040;
app.listen(serverPort,() => console.log(LANG.serverIsRunning(serverPort)));

// Initialize router.
router(app, serverPort);

// Process telegram updates with long-polling.
if (process.env.TELEGRAM_UPDATE_METHOD === TELEGRAM_UPDATE_METHODS.longPolling) {
  const telegramProcessing = new TelegramProcessing();
  await telegramProcessing.process();
  setInterval(async () => await telegramProcessing.process(), TELEGRAM_UPDATE_INTERVAL);
}