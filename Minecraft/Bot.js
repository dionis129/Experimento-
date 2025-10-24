// Minecraft/bot.js
const { createClient } = require('prismarine-bedrock');

function startBot() {
  const bot = createClient({
    host: 'IP_DEL_SERVIDOR', // Cambia por la IP del servidor
    port: 19132,             // Puerto de Bedrock
    username: 'MiBot',       // Nombre del bot
    offline: true            // True si el servidor no usa Microsoft login
  });

  bot.on('spawn', () => {
    console.log('🤖 Bot conectado correctamente!');
  });

  bot.on('message', (message) => {
    console.log('💬 Chat:', message.toString());
  });

  return bot;
}

module.exports = startBot;
