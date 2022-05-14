import pool from "../db/pool.js";
import { createToken } from "../helpers/tokens.js";
import {TOKEN_TYPES} from "../settings/index.js";

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
  async findByToken(token) {
    try {
      const res = await pool.query(
        "select * from users where login_token=$1", [token]
      );
      if (!res.rows || !res.rows.length) {
        return false;
      }
      return res.rows[0];
    } catch (e) {
      console.error('error find user by token', e);
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
  async setLoginToken(telegramUserId, type) {
    const token = createToken();
    try {
      if (type === TOKEN_TYPES.oneTime) {
        await pool.query(
          'update users set login_token=$1, login_until=CURRENT_TIMESTAMP + (5 * interval \'1 minute\'), be_logged_in_until=null where telegram_user_id=$2',
          [token, telegramUserId]
        );
      }
      if (type === TOKEN_TYPES.permanent) {
        await pool.query(
          'update users set login_token=$1, login_until=null, be_logged_in_until=CURRENT_TIMESTAMP + (30 * interval \'1 day\') where telegram_user_id=$2',
          [token, telegramUserId]
        );
      }
      console.log(`login_token set, telegram_user_id: ${telegramUserId}`);
      return token;
    } catch (err) {
      console.error(`error update login_token, telegram_user_id: ${telegramUserId}`, err);
    }
  }
}