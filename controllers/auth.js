import pool from "../db/pool.js";
import {UserModel} from "../models/UserModel.js";
import {TOKEN_TYPES} from "../settings/index.js";

const modelUser = new UserModel();

export const authWithOneTimeToken = async (req, response) => {
  const token = req.body.token;
  try {
    const res = await pool.query(
      'select * from users where login_token=$1 and login_until > CURRENT_TIMESTAMP',
      [token]
    );
    if (res && res.rows && res.rows.length) {
      // Clean login_until column value because token can be used only once.
      const telegramUserId = res.rows[0].telegram_user_id;
      console.log('telegramUserId', telegramUserId);
      await modelUser.setLoginToken(telegramUserId, TOKEN_TYPES.permanent);
      await pool.query('update users set login_until=null where login_token=$1', [token]);
      response.status(200).json({ success: true });
    } else {
      response.status(200).json({ success: false, error: 'wrong_token' });
    }
  } catch (e) {
    console.error('error select token from users table',e)
    response.status(200).json({ success: false, error: 'system_error' });
  }
}