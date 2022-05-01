import TelegramBot from 'node-telegram-bot-api';
import axios from "axios";
import pool from "../db/pool.js";
import {UserModel} from "../database/models/UserModel.js";

const token = '5264071948:AAHHCNNw5U-8suVDWPYIrWs6-kZ7wPJ3x-o';
const bot = new TelegramBot(token);

export const askBot = async () => {
  // TODO Uncomment to show iteration process.
  // console.log('iteration')
  const res = await axios.get('https://api.telegram.org/bot5264071948:AAHHCNNw5U-8suVDWPYIrWs6-kZ7wPJ3x-o/getUpdates')
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
  const updateId = update.update_id;
  const message = update.message;
  const chat = message.chat;
  const from = message.from;
  console.log(`income message, update_id: ${updateId}`)
  // TODO Uncomment to show update details.
  //console.log(update)

  // TODO Uncomment for finish testing and production.
  // Skip no-registration messages.
  // if (from.is_bot || message.text !== '/start') {
  //   return;
  // }

  const userModel = new UserModel();
  userModel.findByTelegramUserId(from.id, (userExists) =>{
    if (!userExists) {
      userModel.createUser(from.id, from.username, from.first_name, from.last_name);
    }
  })
}

export default bot;