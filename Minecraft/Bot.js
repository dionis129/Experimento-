// Minecraft/Bot.js
import { createClient } from "bedrock-protocol";

export default function startBot() {
  const client = createClient({
    host: "dionis169-zC8z.aternos.me", // IP o dominio de tu servidor
    port: 48842,                        // Puerto Bedrock
    username: "MiBotBedrock",           // Nombre del bot
    offline: true                       // Cambia a false si el server pide login de Microsoft
  });

  client.on("join", () => {
    console.log("🤖 Bot conectado correctamente!");
  });

  client.on("text", (packet) => {
    console.log("💬 Chat:", packet.message);
  });

  client.on("disconnect", () => {
    console.log("❌ Bot desconectado del servidor.");
  });

  return client;
}