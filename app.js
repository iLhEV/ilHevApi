// create an express app
import express from 'express';
import passphrase from "./controllers/passphrase.js";

const app = express();
app.use(express.static("public")); // use the express-static middleware

const serverPort = process.env.PORT || 3000;
app.listen(serverPort,
  () => console.log(`Server is running on port ${serverPort}...`)); // start the server listening for requests


//Define routes:
app.get("/", function (req, res) {
    res.send("<h1>Hello World!</h1>")
})

app.get("/json", function (req, res) {
    res.json({info: "Hello World!"});
})

app.get('/createPassphrase', passphrase.createPassphrase);

app.get('/checkPassphrase/:phrase', passphrase.checkPassphrase);
