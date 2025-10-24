// Minecraft/Bot.js
import { createClient } from "bedrock-protocol";
import startAntiAFK from "./AntiAFK.js";

export default function startBot() {
  function connectBot() {
    console.log("⏳ Intentando conectar el bot...");

    const client = createClient({
      host: "dionis169-zC8z.aternos.me",
      port: 48842,
      username: "MiBotBedrock",
      offline: true
    });

    // ✅ Cuando el bot aparece en el mundo
    client.on("join", () => {
      console.log("🤖 Bot conectado correctamente!");
      startAntiAFK(client); // Activamos AntiAFK

      // Verificar periódicamente si el bot sigue dentro del servidor
      setInterval(() => {
        if (!client || !client.spawned) {
          console.log("❌ Bot no está dentro del servidor!");
          // Aquí puedes agregar envío de correo si quieres
        } else {
          console.log("🟢 Bot sigue dentro del servidor, activo.");
        }
      }, 10000); // cada 10 segundos
    });

    // Chat del servidor
    client.on("text", (packet) => console.log("💬 Chat:", packet.message));

    // Desconexión
    client.on("disconnect", () => {
      console.log("❌ Bot desconectado del servidor.");
      setTimeout(connectBot, 10000); // reintento automático
    });

    // Manejo de errores
    client.on("error", (err) => {
      if (err.message.includes("Ping timed out")) {
        console.log("🔁 Servidor no responde, reintentando en 15 segundos...");
        setTimeout(connectBot, 15000); // reintento automático
      } else {
        console.log("⚠️ Otro tipo de error:", err.message);
      }
    });

    return client;
  }

  connectBot();
}