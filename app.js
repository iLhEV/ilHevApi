import 'dotenv/config'
import cors from 'cors';
import express from 'express';
import passphrase from "./controllers/passphrase.js";
import article from "./controllers/article.js";

const app = express();
app.use(express.static("public")); // use the express-static middleware
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
// app.use(cors({
//     origin: 'http://localho.st/'
// }));
if (process.env.TEST_ENV) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
}

const serverPort = process.env.PORT || 3040;
app.listen(serverPort,
  () => console.log(`Server is running on port ${serverPort}...`)); // start the server listening for requests


//Define routes:
app.get("/", function (req, res) {
    res.send(`<h1>App is started on port ${serverPort} ...</h1>`)
})

app.get("/json", function (req, res) {
    res.json({info: 'test json'});
})

app.get('/createPassphrase', passphrase.createPassphrase);

app.get('/checkPassphrase/:phrase', passphrase.checkPassphrase);

app.post('/article/', article.createArticle);
