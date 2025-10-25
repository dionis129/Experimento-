import { createClient } from "bedrock-protocol";
import startAntiAFK from "./AntiAFK.js";

export default function startBot() {
  function connectBot() {
    console.log("⏳ Intentando conectar el bot...");

    const client = createClient({
      host: "dionis169.aternos.me", // 👈 Cambia si tu IP cambia
      port: 30590,                       // 👈 Cambia si tu puerto cambia
      username: "MiBotBedrock",
      offline: true,
      version: "1.21.111"
    });

    client.on("join", () => {
      console.log("🤖 Bot conectado correctamente!");
      startAntiAFK(client);
    });

    // Mostrar mensajes del chat
    client.on("text", (packet) => {
      console.log(`💬 ${packet.source_name || "Servidor"}: ${packet.message}`);
    });

    client.on("disconnect", () => {
      console.log("❌ Bot desconectado del servidor.");
      setTimeout(connectBot, 10000);
    });

    client.on("error", (err) => {
      if (err.message.includes("Ping timed out")) {
        console.log("🔁 Servidor no responde, reintentando...");
        setTimeout(connectBot, 15000);
      } else {
        console.log("⚠️ Error:", err.message);
      }
    });
  }

  connectBot();
}