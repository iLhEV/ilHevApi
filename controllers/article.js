import pool from "../db/pool.js";

const createArticle = async (req, res) => {
  const article = req.body;
  pool.query('insert into articles(text) values($1)', [article.text], async (error, results) => {
    if (error) {
        throw error
    }
    res.send({ success: true });
  })
}

export default { createArticle };

