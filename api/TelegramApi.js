import axios from "axios";

export class TelegramApi {
  async getUpdates(offset = null) {
    try {
      const res = await axios.get(`${process.env.TELEGRAM_API_WITH_TOKEN}/getUpdates`, {
        params: {
          offset
        }
      })
      // Not expected telegram answer.
      if (!res || !res.data || !res.data.ok || !res.data.result) {
        return false;
      }
      return res.data.result;
    } catch(err) {
      console.error('telegram bot get updates error', err)
    }
  }
  async sendMessage(telegramUserId, text) {
    try {
      const res = await axios.post(
        `${process.env.TELEGRAM_API_WITH_TOKEN}/sendMessage`,
        {
          chat_id: telegramUserId,
          text,
          parse_mode: 'html'
        }
      );
      if (!res || !res.data || !res.data.ok || !res.data.result) {
        console.error('error send message to the telegram chat, chat_id:', telegramUserId)
        return false;
      }
      console.log('message sent to telegram chat, user_id:', telegramUserId);
      return true;
    } catch(err) {
      console.error(err)
      return false;
    }
  }
}
