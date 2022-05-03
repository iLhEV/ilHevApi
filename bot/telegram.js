import TelegramBot from 'node-telegram-bot-api';
import axios from "axios";
import {UserModel} from "../database/models/UserModel.js";
import {TelegramUpdateModel} from "../database/models/TelegramUpdateModel.js";

const token = '5264071948:AAHHCNNw5U-8suVDWPYIrWs6-kZ7wPJ3x-o';
const bot = new TelegramBot(token);

export const askBot = async () => {
  // TODO Uncomment to show iteration process.
  // console.log('iteration')
  const res = await axios.get(`${process.env.TELEGRAM_API_WITH_TOKEN}/getUpdates`)
  // Data is not expected telegram answer.
  if (!res || !res.data || !res.data.ok || !res.data.result) {
    return;
  }
  const updates = res.data.result;
  // No incoming updates.
  if (!updates || !updates.length) {
    return;
  }
  updates.forEach(el => {
    processTelegramUpdate(el);
  })
}

export const processTelegramUpdate = (update) => {
  const userModel = new UserModel();
  const telegramUpdateModel = new TelegramUpdateModel();

  const updateId = update.update_id;
  const message = update.message;
  const chat = message.chat;
  const entities = message.entities;
  const from = message.from;
  const telegramUserId = from.id;
  const messageText = message.text;
  console.log(`income message, update_id: ${updateId}`)
  // TODO Uncomment to show update details.
  console.log(update)

  // Don't process messages from other bots.
  if (from.is_bot) {
    return;
  }

  // Skip already processed updates.
  telegramUpdateModel.findProcessed(updateId, (findNumber) => {
    if (findNumber) {
      return;
    }

    // Process registration messages.
    if (messageText === '/start') {
      userModel.findByTelegramUserId(telegramUserId, (userExists) =>{
        if (!userExists) {
          userModel.createUser(telegramUserId, from.username, from.first_name, from.last_name);
          telegramUpdateModel.markAsProcessed(updateId);
        }
      })
    }

    // Authorization requests.
    if (messageText === '/login') {
      userModel.setLoginToken(telegramUserId, async (token) => {
        const res = await axios.post(`${process.env.TELEGRAM_API_WITH_TOKEN}/sendMessage`,
          {chat_id: telegramUserId, text: token}
        );
        // Data is not expected telegram answer.
        if (!res || !res.data || !res.data.ok || !res.data.result) {
          console.error('error send message to the telegram chat, chat_id:', telegramUserId)
          return;
        }
        console.log('message sent to telegram chat, answer:', res.data);
        telegramUpdateModel.markAsProcessed(updateId);
      })
    }
  });
}

export default bot;