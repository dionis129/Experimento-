import { createClient } from "bedrock-protocol";
import startAntiAFK from "./AntiAFK.js";

export default function startBot() {
  function connectBot() {
    console.log("⏳ Intentando conectar el bot...");

    const client = createClient({
      host: "dionis169-zC8z.aternos.me", // tu dirección del server
      port: 48842,                       // puerto del server
      username: "MiBotBedrock",          // nombre del bot
      offline: true,                     // modo sin Xbox
      version: "1.21.111",               // versión de tu server
    });

    client.on("join", () => {
      console.log("🤖 Bot conectado correctamente al servidor!");
    });

    client.on("start_game", (packet) => {
      console.log("✅ Mundo cargado, posición inicial:", packet.player_position);
      startAntiAFK(client);
    });

    client.on("text", (packet) => console.log("💬 Chat:", packet.message));

    client.on("disconnect", () => {
      console.log("❌ Bot desconectado. Reintentando en 10 segundos...");
      setTimeout(connectBot, 10000);
    });

    client.on("error", (err) => {
      if (err.message.includes("Ping timed out")) {
        console.log("🔁 Servidor no responde, reintentando en 15 segundos...");
        setTimeout(connectBot, 15000);
      } else {
        console.log("⚠️ Error:", err.message);
      }
    });

    return client;
  }

  connectBot();
}