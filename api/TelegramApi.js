import axios from "axios";

export class TelegramApi {
  async getUpdates(offset = null) {
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
  }
}
