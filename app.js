import 'dotenv/config'
import express from 'express';
import passphraseController from "./controllers/passphrase.js";
import articleController from "./controllers/article.js";
import telegramController from "./controllers/telegram.js"
import axios from "axios";
import {askBot, processTelegramUpdate} from "./bot/telegram.js";

const app = express();
app.use(express.static("public")); // Use the express-static middleware.
app.use(express.json());       // To support JSON-encoded bodies.
app.use(express.urlencoded()); // To support URL-encoded bodies.

// Hack for development, because Chrome doesn't support CORS for connections from localhost.
if (process.env.ALLOW_ORIGIN_ALL === 'true') {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        next();
    });
}

const serverPort = process.env.PORT || 3040;
app.listen(serverPort,
  () => console.log(`Server is running on port ${serverPort}...`)); // start the server listening for requests

// Routes list.
app.get("/", function (req, res) {
    res.send(`<h1>App is started on port ${serverPort}...</h1>`)
})
app.get('/createPassphrase', passphraseController.createPassphrase);
app.get('/checkPassphrase/:phrase', passphraseController.checkPassphrase);
app.get('/articles', articleController.showList);
app.get('/article/:id', articleController.showArticle);
app.delete('/article/:id', articleController.deleteArticle);
app.post('/article', articleController.createOrUpdateArticle);
app.get('/setWebHook', telegramController.setWebHook);
app.get('/crt.pem', telegramController.certFile);
app.get('/webHook', telegramController.webHook);

setInterval(askBot, 10000);