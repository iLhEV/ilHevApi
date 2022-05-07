import pool from "../db/pool.js";

export const checkToken = async (request, response) => {
  const token = request.params.token;
  try {
    const res = await pool.query('select * from users where login_token=$1', [token]);
    if (res && res.rows && res.rows.length) {
      pool.query("update passphrases set phrase=''", async (error, results) => {
        if (error) {
          response.status(200).json({ success: false, error: true });
          throw error
        }
      });
      response.status(200).json({ success: true });
    } else {
      response.status(200).json({ success: false });
    }
  } catch (e) {
    console.error('error select token from users table',e)
    response.status(200).json({ success: false, error: true });
  }
}

export default { checkToken }