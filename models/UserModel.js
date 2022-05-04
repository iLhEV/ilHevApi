import pool from "../db/pool.js";
import { createToken } from "../helpers/tokens.js";

export class UserModel {
  async findByTelegramUserId(telegramUserId) {
    try {
      const res = await pool.query(
        "select telegram_user_id from users where telegram_user_id=$1", [parseInt(telegramUserId, 10)]
      );
      if (!res.rows || !res.rows.length) {
        return false;
      }
      return res.rows;
      } catch (err) {
      console.error('error find user', err);
    }
  }
  async createUser(telegramUserId, telegramUserName, telegramFirstName, telegramLastName) {
    try {
      await pool.query(
        'insert into users(telegram_user_id, telegram_user_name, telegram_first_name, telegram_last_name, verified) values($1, $2, $3, $4, false)',
        [telegramUserId, telegramUserName, telegramFirstName, telegramLastName]
      );
      console.log(`user added, telegram_user_id: ${telegramUserId}`);
    } catch (err) {
      console.error(`error add user, telegram_id: ${telegramUserId}`, err);
    }
  }
  async setLoginToken(telegramUserId) {
    const token = createToken();
    try {
      await pool.query(
        'update users set login_token=$1, login_token_expire_at=now() where telegram_user_id=$2',
        [token, telegramUserId]
      );
      console.log(`login_token set, telegram_user_id: ${telegramUserId}`);
      return token;
    } catch (err) {
      console.error(`error update login_token, telegram_user_id: ${telegramUserId}`, err);
    }
  }
}