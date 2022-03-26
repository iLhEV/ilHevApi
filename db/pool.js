import pg from 'pg';

const Pool = pg.Pool;
const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_BASE,
  password: process.env.DB_PASS,
  port: 5432,
}

if (process.env.DB_SSL_HEROKU === 'true') {
  dbConfig.ssl = {
    rejectUnauthorized: false,
  }
}

const pool = new Pool(dbConfig);

export default pool;
