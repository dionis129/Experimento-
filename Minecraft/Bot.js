// Minecraft/Bot.js
import { createClient } from "bedrock-protocol";

export default function startBot() {
  function connectBot() {
    console.log("⏳ Intentando conectar el bot...");

    const client = createClient({
      host: "dionis169-zC8z.aternos.me", // IP o dominio de tu servidor
      port: 48842,                        // Puerto Bedrock
      username: "MiBotBedrock",           // Nombre del bot
      offline: true                       // Cambia a false si el server pide login de Microsoft
    });

    // Conexión exitosa
    client.on("join", () => {
      console.log("🤖 Bot conectado correctamente!");
    });

    // Mensajes del chat
    client.on("text", (packet) => {
      console.log("💬 Chat:", packet.message);
    });

    // Desconexión
    client.on("disconnect", () => {
      console.log("❌ Bot desconectado del servidor. Reintentando en 10 segundos...");
      setTimeout(connectBot, 10000); // Reintento automático
    });

    // Manejo de errores
    client.on("error", (err) => {
      console.log("⚠️ Error del bot:", err.message);

      if (err.message.includes("Ping timed out")) {
        console.log("🔁 Servidor no responde, reintentando en 15 segundos...");
        setTimeout(connectBot, 15000); // Reintento automático
      }
    });

    return client;
  }

  // Iniciar la primera conexión
  connectBot();
}