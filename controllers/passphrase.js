import pool from "../db/pool.js";

const checkPassphrase = async (request, response) => {
  const inputPhrase = request.params.phrase;
  pool.query('select phrase from passphrases where phrase=$1', [inputPhrase], async (error, results) => {
    if (error) {
      response.status(200).json({ success: false, error: true });
      throw error
    }
    if (results && results.rows && results.rows.length) {
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
  });
}

export default { checkPassphrase };

