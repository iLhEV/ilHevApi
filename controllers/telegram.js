import telegram from "../bot/telegram.js";
import axios from 'axios'

import fileSystem from 'fs'
import path from 'path'

const setWebHook = async (request, response) => {
  await telegram.setWebHook('https://f850-85-117-62-164.ngrok.io/webHook', {
    certificate: '/crt.pem',
  });
  response.status(200).json({success: true});
}

const certFile = async (request, response) => {
  const filePath = path.join('crt.pem');
  const stat = fileSystem.statSync(filePath);

  response.writeHead(200, {
    'Content-Type': 'text/plain',
    'Content-Length': stat.size
  });

  const readStream = fileSystem.createReadStream(filePath);
  readStream.pipe(response);
}

const webHook = async (request, response) => {
  console.log('hello from bot')
  const res = await axios.get('https://api.telegram.org/bot5264071948:AAHHCNNw5U-8suVDWPYIrWs6-kZ7wPJ3x-o/getUpdates')
  response.status(200).json({success: true, data: res.data});
}

export default { setWebHook, certFile, webHook }