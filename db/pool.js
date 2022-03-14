import pg from 'pg';

const Pool = pg.Pool;

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'api',
//   password: '',
//   port: 5432,
// })

const pool = new Pool({
    user: 'kezvccretguvni',
    host: 'ec2-3-209-61-239.compute-1.amazonaws.com',
    database: 'd77qu4a3cj8151',
    password: '941548e98efa33f12b975c0263c43ad0ef86c381a80743d7746260e982ec0588',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
})

export default pool;
