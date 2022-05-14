import {TelegramProcessing} from "../classes/TelegramProcessing.js";

export const processWebHook = async (request, response) => {
  if (request.body) {
    const telegramProcessing = new TelegramProcessing();
    await telegramProcessing.processUpdate(request.body);
  }
  response.send({ success: true });
}