import axios from "axios";

export class TelegramApi {
  async getUpdates() {
    const res = await axios.get(`${process.env.TELEGRAM_API_WITH_TOKEN}/getUpdates`)
    // Not expected telegram answer.
    if (!res || !res.data || !res.data.ok || !res.data.result || !res.data.result.length) {
      return false;
    }
    return res.data.result;
  }
}
