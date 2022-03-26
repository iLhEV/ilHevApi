import pool from "../db/pool.js";

const createArticle = async (req, res) => {
  console.log('run route articles.createArticle')
  const article = req.body;
  pool.query('insert into articles(text) values($1)', [article.text], async (error, results) => {
    if (error) {
        throw error
    }
    console.log('article added success');
    res.send({ success: true });
    console.log('article added message success');
  })
}

export default { createArticle };

