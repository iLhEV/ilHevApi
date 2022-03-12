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
    ssl: {
        rejectUnauthorized: false
    }
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

//Create telegram bot
const TelegramBot = require('node-telegram-bot-api');
const token = '5032876472:AAFvjRv9EX6NBt_cXe3A6Z0I8Vmc8xaT0E0';
const bot = new TelegramBot(token);

const createToken = async (request, response) => {
    const phrase = makePhrase(30);
    pool.query('update passphrases set phrase = $1', [phrase], async (error, results) => {
        if (error) {
            throw error
        }
        const tgAnswer = await bot.sendMessage(165908109, phrase);
        if (tgAnswer.message_id) {
            response.status(200).json({success: true});
        } else {
            response.status(200).json({success: false});
        }
    })
}

module.exports = {
    createToken,
}

