// create an express app
const express = require("express")
const app = express()

// use the express-static middleware
app.use(express.static("public"))

// define the first route
app.get("/", function (req, res) {
    res.send("<h1>Hello World!</h1>")
})


const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '5032876472:AAFvjRv9EX6NBt_cXe3A6Z0I8Vmc8xaT0E0';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.sendMessage(165908109, 'Received your message5');


// start the server listening for requests
app.listen(process.env.PORT || 3000,
    () => console.log("Server is running..."));

app.get("/json", function (req, res) {
    res.json({info: "Hello World!"});
})

const db = require('./settings/psql');

app.get('/createPassPhrase', db.createToken);

