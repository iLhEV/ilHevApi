import 'dotenv/config'
import express from 'express';

import {TelegramProcessing} from "./classes/TelegramProcessing.js";
import {router} from "./router/index.js";
import {TELEGRAM_UPDATE_INTERVAL} from "./settings/index.js";
import {LANG} from "./settings/lang.js";

const app = express();

// Express configuration.
app.use(express.static("public")); // Use the express-static middleware.
app.use(express.json());       // To support JSON-encoded bodies.
app.use(express.urlencoded()); // To support URL-encoded bodies.

// Because Chrome doesn't support CORS for connections from localhost we need this for local development.
// TODO Check that in heroku config it's false.
if (process.env.ALLOW_ORIGIN_ALL === 'true') {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });
}

// TODO Add authorizations checks:
// 1) After one-time login token was successfully checked permanent token should be generated, written to database
//    in place of one-time token and returned to frontend.
// 2) Every request in private zone should be checked for permanent token and if token is presented then authorized.
// 3) Add new controller method to return user info based on permanent token including info about token expiration.

// Run node.js web server.
const serverPort = process.env.PORT || 3040;
app.listen(serverPort,() => console.log(LANG.serverIsRunning(serverPort)));

// Initialize router.
router(app, serverPort);

// Process telegram updates.
const telegramProcessing = new TelegramProcessing();
await telegramProcessing.process();
setInterval(async () => await telegramProcessing.process(), TELEGRAM_UPDATE_INTERVAL);