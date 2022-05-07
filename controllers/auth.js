import pool from "../db/pool.js";

export const authWithOneTimeToken = async (req, response) => {
  const token = req.body.token;
  try {
    const res = await pool.query(
      'select * from users where login_token=$1 and login_until > CURRENT_TIMESTAMP',
      [token]
    );
    if (res && res.rows && res.rows.length) {
      response.status(200).json({ success: true });
    } else {
      response.status(200).json({ success: false, error: 'wrong_token' });
    }
  } catch (e) {
    console.error('error select token from users table',e)
    response.status(200).json({ success: false, error: 'system_error' });
  }
}