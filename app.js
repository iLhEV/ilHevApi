// // create an express app
// const express = require("express")
// const app = express()
//
// // use the express-static middleware
// app.use(express.static("public"))
//
// // define the first route
// app.get("/", function (req, res) {
//     res.send("<h1>Hello World!</h1>")
// })
//
//
//
// // start the server listening for requests
// app.listen(process.env.PORT || 3000,
//     () => console.log("Server is running..."));

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '5032876472:AAFvjRv9EX6NBt_cXe3A6Z0I8Vmc8xaT0E0';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(msg.text);

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Received your message3');
});