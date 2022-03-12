const Pool = require('pg').Pool
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'api',
//     password: '',
//     port: 5432,
// })

const pool = new Pool({
    user: 'kezvccretguvni',
    host: 'ec2-3-209-61-239.compute-1.amazonaws.com',
    database: 'd77qu4a3cj8151',
    password: '941548e98efa33f12b975c0263c43ad0ef86c381a80743d7746260e982ec0588',
    port: 5432,
})


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

const createToken = (request, response) => {
    pool.query('update passphrases set phrase = $1', [makePhrase(30)], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    createToken,
}

