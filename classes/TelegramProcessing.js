import axios from "axios";
import { TelegramApi } from "../api/TelegramApi.js";
import { UserModel } from "../models/UserModel.js";
import { TelegramUpdateModel } from "../models/TelegramUpdateModel.js";

const telegramApi = new TelegramApi();
const telegramUpdateModel = new TelegramUpdateModel();
const userModel = new UserModel();

export class TelegramProcessing {
  async process () {
    // TODO Uncomment to show iteration process.
    // console.log('iteration')
    const res = await axios.get(`${process.env.TELEGRAM_API_WITH_TOKEN}/getUpdates`)
    // Data is not expected telegram answer.
    if (!res || !res.data || !res.data.ok || !res.data.result) {
      return;
    }

    // Get updates from the telegram server.
    const updates = await telegramApi.getUpdates();

    // No incoming updates.
    if (!updates) {
      return;
    }

    // Loop over updates.
    updates.forEach(el => {
      this.processUpdate(el);
    })

    // Remove updates from the telegram server.

  }

  processUpdate(update) {
    // Skip updates without message.
    if (!update.message) {
      return
    }
    // TODO Uncomment to show update details.
    console.log(update)

    const updateId = update.update_id;
    const message = update.message;
    const chat = message.chat;
    const entities = message.entities;
    const from = message.from;
    const telegramUserId = from.id;
    const messageText = message.text;

    // Don't process messages from other bots.
    if (from.is_bot) {
      return;
    }

    // Skip already processed updates.
    telegramUpdateModel.findProcessed(updateId, (findNumber) => {
      if (findNumber) {
        return;
      }

      console.log(`unprocessed income message, update_id: ${updateId}`)

      // Process registration messages.
      if (messageText === '/start') {
        userModel.findByTelegramUserId(telegramUserId, (userExists) => {
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
            {chat_id: telegramUserId, text: `Your authorization token is:\n${token}`}
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
}
