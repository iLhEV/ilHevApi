import pool from "../../db/pool.js";
import {createToken} from "../../helpers/tokens.js";

export class UserModel {
  findByTelegramUserId(telegramUserId, callback) {
    pool.query(
      "select telegram_user_id from users where telegram_user_id=$1",
      [parseInt(telegramUserId, 10)],
      async (error, res) => {
        if (error) {
          console.error('error find user');
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
  createUser(telegramUserId, telegramUserName, telegramFirstName, telegramLastName) {
    pool.query(
      'insert into users(telegram_user_id, telegram_user_name, telegram_first_name, telegram_last_name, verified) values($1, $2, $3, $4, false)',
      [telegramUserId, telegramUserName, telegramFirstName, telegramLastName],
      async (error, results) => {
        if (error) {
          console.error(`error add user, telegram_id: ${telegramUserId}`);
          throw error
        }
        console.log(`user added, telegram_user_id: ${telegramUserId}`);
      }
    );
  }
  setLoginToken(telegramUserId, callback) {
    const token = createToken();
    pool.query(
      'update users set login_token=$1, login_token_expire_at=now() where telegram_user_id=$2',
      [token, telegramUserId],
      async (error, results) => {
        if (error) {
          console.error(`error update login_token, telegram_user_id: ${telegramUserId}`);
          throw error
        }
        console.log(`login_token set, telegram_user_id: ${telegramUserId}`);
        callback(token);
      }
    );
  }
}