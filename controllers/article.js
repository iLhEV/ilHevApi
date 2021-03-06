import pool from "../db/pool.js";

export const createOrUpdateArticle = async (req, response) => {
  const article = req.body;
  if (article.id) {
    pool.query('update articles set text=$1 where id=$2', [article.text, article.id], async (error, results) => {
      if (error) {
        console.error('error update article, id: ', article.id);
        throw error
      }
      console.log('article updated, id:', article.id);
      response.send({success: true});
    });
  } else {
    pool.query('insert into articles(text) values($1)', [article.text], async (error, results) => {
      if (error) {
        console.error('error add article');
        throw error
      }
      console.log('article added');
      response.send({success: true});
    });
  }
}

export const showArticleList = async (request, response) => {
  pool.query("select * from articles order by id desc", async (error, res) => {
    if (error) {
      console.error('error get articles');
      throw error
    }
    console.log('articles sent, count: ', res.rowCount);
    response.send({ success: true, data: res.rows, meta: { count: res.rowCount } });
  });
}

export const showArticle = async (request, response) => {
  pool.query("select * from articles where id=$1", [request.params.id], async (error, res) => {
    if (error) {
      console.error('error get article');
      throw error
    }
    console.log('article sent, id: ', request.params.id);
    if (res.rows.length) {
      response.send({ success: true, data: res.rows[0] });
    } else {
      response.send({ success: false });
    }
  });
}

export const deleteArticle = async (request, response) => {
  pool.query("DELETE from articles where id=$1", [request.params.id], async (error, res) => {
    if (error) {
      console.error('error delete article, id: ', request.params.id);
      throw error
    }
    console.log('article deleted, id: ', request.params.id);
    response.send({success: true});
  });
}