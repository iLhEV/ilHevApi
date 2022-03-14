import pool from "../db/pool.js";
import telegram from "../bot/telegram.js";

const makePhrase = (length) => {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const createPassphrase = async (request, response) => {
    const phrase = makePhrase(30);
    pool.query('update passphrases set phrase = $1', [phrase], async (error, results) => {
        if (error) {
            throw error
        }
        const tgAnswer = await telegram.sendMessage(165908109, phrase);
        if (tgAnswer.message_id) {
            response.status(200).json({success: true});
        } else {
            response.status(200).json({success: false});
        }
    })
}

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

export default { createPassphrase, checkPassphrase };

