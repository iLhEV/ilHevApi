import { TelegramApi } from "../api/TelegramApi.js";
import { UserModel } from "../models/UserModel.js";
import { TelegramUpdateModel } from "../models/TelegramUpdateModel.js";
import {TOKEN_TYPES} from "../settings/index.js";

const botTelegram = new TelegramApi();
const modelTelegramUpdate = new TelegramUpdateModel();
const modelUser = new UserModel();

export class TelegramProcessing {
  async process () {
    // Get updates from the telegram server.
    const updates = await botTelegram.getUpdates();

    // No incoming updates.
    if (!updates || !updates.length) {
      return;
    }

    // Loop over updates.
    updates.forEach(el => {
      this.processUpdate(el);
    })

    // Remove updates from the telegram server.
    const lastUpdate = updates[updates.length - 1];
    await botTelegram.getUpdates(lastUpdate.update_id + 1);
    console.log('Updates cleaned up from the telegram server.')
  }

  async processUpdate(update) {
    // Skip updates without message.
    if (!update.message) {
      return
    }
    // TODO Uncomment to show update details.
    // console.log(update)

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
    const isProcessed = await modelTelegramUpdate.findProcessed(updateId);
    if (isProcessed) {
      return;
    };

    console.log(`unprocessed income message, update_id: ${updateId}`)

    // Process registration messages.
    if (messageText === '/start') {
      const user = await modelUser.findByTelegramUserId(telegramUserId)
      if (!user) {
        await modelUser.createUser(telegramUserId, from.username, from.first_name, from.last_name);
        await modelTelegramUpdate.markAsProcessed(updateId);
      }
    }

    // Authorization requests.
    if (messageText === '/login') {
      const token = await modelUser.setLoginToken(telegramUserId, TOKEN_TYPES.oneTime);
      let answer = "<b>It's yours one-time login token.</b>";
      answer += `\n\n*************************************\n** ${token} **\n*************************************`;
      answer += '\n\n<i>Valid only for 5 minutes and only for one login.</i>'
      const res = botTelegram.sendMessage(telegramUserId, answer);
      if (res) {
        await modelTelegramUpdate.markAsProcessed(updateId);
      }
    }
    await modelTelegramUpdate.markAsProcessed(updateId, true);
  }
}
