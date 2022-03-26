import pool from "../db/pool.js";
import telegram from "../bot/telegram.js";

const createArticle = async (req, res) => {
  const article = req.body;
  res.send({success: true})
    pool.query('insert into articles(text) values($1)', [article.text], async (error, results) => {
        if (error) {
            throw error
        }
        console.log('article is added');
    })
}

export default { createArticle };

