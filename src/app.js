const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv')

dotenv.config()

const app = express();
const port = process.env.PORT || 3000;

// Use body-parser para interpretar o corpo da requisição como JSON
app.use(bodyParser.json());

// Substitua com o token do seu bot do Telegram e o chat_id de destino
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
let TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Cria uma instância do bot
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

// Captura qualquer mensagem enviada ao bot
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;

//   // Exibe o chat_id no console
//   console.log(`Chat ID: ${chatId}`);

//   // Envia uma mensagem para o usuário informando o chat_id
//   bot.sendMessage(chatId, `Seu chat ID é: ${chatId}`);
// });


// Endpoint para receber o JSON e enviar para o Telegram
app.post('/send', async (req, res) => {
  try {
    const jsonData = req.body;

    // Formatar a mensagem a ser enviada no Telegram
    const message = `Recebi o seguinte JSON:\n${JSON.stringify(jsonData, null, 2)}`;

    bot.sendMessage(TELEGRAM_CHAT_ID, `Mensagem: ${message}`);

    // Retornar sucesso
    res.json({
      status: 'success'
    });
  } catch (error) {
    console.error('Erro ao enviar mensagem para o Telegram:', error);
    // res.status(500).json({
    //   status: 'error',
    //   message: 'Não foi possível enviar a mensagem para o Telegram'
    // });

    res.json({
        status: 'erro',
        telegramResponse: 'Não foi possível enviar a mensagem para o Telegram'
      });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
