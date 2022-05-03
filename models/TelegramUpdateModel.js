import pool from "../db/pool.js";

export class TelegramUpdateModel {
  markAsProcessed(telegramUpdateId) {
    pool.query(
      'insert into processed_telegram_updates(id) values($1)',
      [telegramUpdateId],
      async (error, results) => {
        if (error) {
          console.error(`error add telegram update, update_id: ${telegramUpdateId}`);
          throw error
        }
        console.log(`telegram update added, update_id: ${telegramUpdateId}`);
      }
    );
  }
  findProcessed(telegramUpdateId, callback) {
    pool.query(
      "select id from processed_telegram_updates where id=$1",
      [telegramUpdateId],
      async (error, res) => {
        if (error) {
          console.error('error find processed telegram update, update_id:', telegramUpdateId);
          throw error
        }
        if (!res.rows.length) {
          callback(false)
        } else {
          callback(res.rows)
        }
      }
    );
  }
}