import pool from "../db/pool.js";

const createArticle = async (req, res) => {
  const article = req.body;
  pool.query('insert into articles(text) values($1)', [article.text], async (error, results) => {
    if (error) {
        console.error('error add article');
        throw error
    }
    console.log('article added');
    res.send({ success: true });
  });
}

const showList = async (request, response) => {
  pool.query("select * from articles order by id desc", async (error, res) => {
    if (error) {
      console.error('error get articles');
      throw error
    }
    console.log('articles sent, count: ', res.rowCount);
    response.send({ success: true, data: res.rows, meta: { count: res.rowCount } });
  });
}

export default { createArticle, showList };
