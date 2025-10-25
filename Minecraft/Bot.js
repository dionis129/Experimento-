import { createClient } from "bedrock-protocol";
import startAntiAFK from "./AntiAFK.js";

export default function startBot() {
  function connectBot() {
    console.log("⏳ Intentando conectar el bot...");

    const client = createClient({
      host: "dionis169.aternos.me",
      port: 19132,
      username: "MiBotBedrock",
      offline: true,
      version: "1.21.111.1" // 👈 Versión agregada aquí
    });

    client.on("join", () => {
      console.log("🤖 Bot conectado correctamente!");
      startAntiAFK(client); // Activamos AntiAFK
    });

    client.on("text", (packet) => console.log("💬 Chat:", packet.message));

    client.on("disconnect", () => {
      console.log("❌ Bot desconectado del servidor.");
      setTimeout(connectBot, 10000); // reintento automático
    });

    client.on("error", (err) => {
      if (err.message.includes("Ping timed out")) {
        console.log("🔁 Servidor no responde, reintentando en 15 segundos...");
        setTimeout(connectBot, 15000);
      } else {
        console.log("⚠️ Otro tipo de error:", err.message);
      }
    });

    return client;
  }

  connectBot();
}