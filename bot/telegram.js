import TelegramBot from 'node-telegram-bot-api';
import axios from "axios";
import pool from "../db/pool.js";

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
  // TODO show update
  console.log('updating bot data...')

  pool.query("select telegram_user_id from users where telegram_user_id=$1", [parseInt(from.id)], async (error, res) => {
    if (error) {
      console.error('error find user');
      throw error
    }
    if (!res.rows.length) {
      pool.query('insert into users(telegram_user_id, telegram_user_name) values($1, $2)',
        [from.id, from.username], async (error, results) => {
        if (error) {
          console.error(`error add user, telegram_id: ${from.id}`);
          throw error
        }
        console.log(`user added, telegram_id: ${from.id}`);
      });
    }
  });


}

export default bot;